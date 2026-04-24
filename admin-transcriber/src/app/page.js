"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";

const formatDate = (dateString) => new Date(dateString).toLocaleString();

const getAudioDuration = (file) =>
  new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(audio.src);
      resolve(audio.duration);
    };
    audio.onerror = () => reject(new Error("Failed to load audio metadata."));
    audio.src = URL.createObjectURL(file);
  });

export default function HomePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [adminExists, setAdminExists] = useState(true);
  const [loadingAdminStatus, setLoadingAdminStatus] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [transcripts, setTranscripts] = useState([]);
  const [transcriptLoading, setTranscriptLoading] = useState(false);

  const [audioFile, setAudioFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const isLoggedIn = useMemo(() => Boolean(session?.user?.id), [session?.user?.id]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      setLoadingAdminStatus(true);
      const response = await fetch("/api/admin-status");
      const data = await response.json();
      setAdminExists(data.adminExists);
      setLoadingAdminStatus(false);
    };

    fetchAdminStatus();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchTranscripts = async () => {
      setTranscriptLoading(true);
      const response = await fetch("/api/transcripts");
      if (response.ok) {
        const data = await response.json();
        setTranscripts(data.transcripts);
      }
      setTranscriptLoading(false);
    };

    fetchTranscripts();
  }, [isLoggedIn]);

  const getAdminEmail = (value) => `${value.trim().toLowerCase()}@admin.local`;

  const handleAuth = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required.");
      return;
    }

    setAuthLoading(true);

    const email = getAdminEmail(username);

    try {
      if (!adminExists) {
        const signUpResult = await authClient.signUp.email({
          email,
          password,
          name: username.trim(),
        });

        if (signUpResult.error) {
          setMessage(signUpResult.error.message || "Failed to create admin account.");
          setAuthLoading(false);
          return;
        }

        setAdminExists(true);
      }

      const signInResult = await authClient.signIn.email({
        email,
        password,
      });

      if (signInResult.error) {
        setMessage(signInResult.error.message || "Invalid credentials.");
      } else {
        setMessage("");
        await refetch();
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setTranscripts([]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!audioFile) {
      setMessage("Please choose an audio file first.");
      return;
    }

    try {
      const duration = await getAudioDuration(audioFile);
      if (duration > 60) {
        setMessage("Audio must be less than 1 minute.");
        return;
      }
    } catch {
      setMessage("Could not verify audio duration. Try another file.");
      return;
    }

    setUploadLoading(true);

    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await fetch("/api/transcripts", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Failed to transcribe audio.");
      setUploadLoading(false);
      return;
    }

    setTranscripts((current) => [data.transcript, ...current]);
    setAudioFile(null);
    setMessage("Transcript generated and saved.");
    setUploadLoading(false);
  };

  if (isPending || loadingAdminStatus) {
    return <main className="mx-auto max-w-3xl p-6">Loading...</main>;
  }

  if (!isLoggedIn) {
    return (
      <main className="mx-auto min-h-screen max-w-md p-6">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-gray-600">
          {!adminExists
            ? "First login will create the single admin account."
            : "Use your admin username and password."}
        </p>

        <form onSubmit={handleAuth} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm">Username</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Password</label>
            <input
              type="password"
              className="w-full rounded border px-3 py-2"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {authLoading
              ? "Please wait..."
              : adminExists
                ? "Login"
                : "Create Admin & Login"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-red-600">{message}</p> : null}
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audio Transcription Admin</h1>
          <p className="text-sm text-gray-600">Logged in as {session.user.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded border border-gray-300 px-4 py-2 text-sm"
        >
          Logout
        </button>
      </div>

      <section className="rounded border p-4">
        <h2 className="text-lg font-semibold">Upload Audio (&lt; 1 minute)</h2>
        <form onSubmit={handleUpload} className="mt-4 flex flex-col gap-3">
          <input
            type="file"
            accept="audio/*"
            onChange={(event) => setAudioFile(event.target.files?.[0] || null)}
            required
          />
          <button
            type="submit"
            disabled={uploadLoading}
            className="w-fit rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {uploadLoading ? "Transcribing..." : "Upload and Transcribe"}
          </button>
        </form>
      </section>

      <section className="mt-6 rounded border p-4">
        <h2 className="text-lg font-semibold">Past Transcripts</h2>

        {transcriptLoading ? <p className="mt-3 text-sm">Loading transcripts...</p> : null}

        {!transcriptLoading && transcripts.length === 0 ? (
          <p className="mt-3 text-sm text-gray-600">No transcripts yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {transcripts.map((item) => (
              <li key={item.id} className="rounded border p-3">
                <p className="whitespace-pre-wrap text-sm">{item.text}</p>
                <p className="mt-2 text-xs text-gray-500">{formatDate(item.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {message ? <p className="mt-4 text-sm text-red-600">{message}</p> : null}
    </main>
  );
}
