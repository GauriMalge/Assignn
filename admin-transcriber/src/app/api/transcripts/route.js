import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_AUDIO_SIZE_BYTES = 10 * 1024 * 1024;

const fileToBase64 = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
};

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
    return NextResponse.json({ message: "Audio file is required." }, { status: 400 });
  }

  if (audioFile.size > MAX_AUDIO_SIZE_BYTES) {
    return NextResponse.json({ message: "Audio file is too large." }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const audioBase64 = await fileToBase64(audioFile);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          data: audioBase64,
          mimeType: audioFile.type || "audio/mpeg",
        },
      },
      {
        text: "Transcribe this audio. Return only the plain transcript text.",
      },
    ],
  });

  const transcriptText = response.text?.trim();

  if (!transcriptText) {
    return NextResponse.json(
      { message: "Could not generate a transcript from this audio." },
      { status: 500 }
    );
  }

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
}
