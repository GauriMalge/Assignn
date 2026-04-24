export const runtime = "nodejs";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_AUDIO_SIZE_BYTES = 10 * 1024 * 1024;

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const transcripts = await prisma.transcript.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      text: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ transcripts });
}

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const audioFile = formData.get("audio");

  if (!(audioFile instanceof File)) {
    return NextResponse.json(
      { message: "Audio file is required." },
      { status: 400 }
    );
  }

  if (audioFile.size > MAX_AUDIO_SIZE_BYTES) {
    return NextResponse.json(
      { message: "Audio file is too large." },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // ✅ Directly pass file (NO fs, NO temp files)
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "gpt-4o-mini-transcribe",
    });

    const transcriptText = transcription.text;

    if (!transcriptText) {
      throw new Error("No transcript generated");
    }

    // Save to DB
    const transcript = await prisma.transcript.create({
      data: {
        text: transcriptText,
        createdById: session.user.id,
      },
    });

    return NextResponse.json({
      transcript: {
        id: transcript.id,
        text: transcript.text,
        createdAt: transcript.createdAt,
      },
    });

  } catch (error) {
    console.error("Transcription error:", error);

    return NextResponse.json(
      { message: "Transcription failed" },
      { status: 500 }
    );
  }
}