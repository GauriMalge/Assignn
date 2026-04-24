# Admin Audio Transcriber (Next.js + Better Auth + OpenAI + PostgreSQL)

This is a full-stack Next.js app where a single admin logs in, uploads short audio files (< 1 minute), sends audio to OpenAI for transcription, and stores only transcript text in PostgreSQL.

## Features

- Better Auth based login/logout
- Single-admin setup flow (first login creates the only admin account)
- Audio upload and transcription through OpenAI API
- Transcript text persisted in PostgreSQL (audio is never stored)
- Transcript history list on dashboard
- Railway deployment-ready config

## Tech stack

- Next.js (App Router)
- Better Auth
- Prisma + PostgreSQL
- OpenAI API (`openai`)

## Environment variables

Copy `.env.example` to `.env.local` for local development.

Required variables:

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

For local dev:

- `BETTER_AUTH_URL=http://localhost:3000`

For Railway production:

- `BETTER_AUTH_URL=https://<your-railway-domain>`

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Push schema to DB:

```bash
npm run db:push
```

4. Run app:

```bash
npm run dev
```

## Railway deployment

1. Push this `admin-transcriber` project to GitHub.
2. Create a new Railway project from your repo.
3. Add a **PostgreSQL** service in Railway.
4. Set environment variables in Railway service:
   - `DATABASE_URL` (from Railway Postgres)
   - `OPENAI_API_KEY`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (your Railway public URL)
5. Railway will use `railway.toml` and run:
   - Build with Nixpacks
   - Start with `npx prisma db push && npm run start`

## Admin flow

- On first login, if no user exists, entering username/password creates the single admin account.
- After that, only that account can log in.

## Notes

- Audio files are processed in memory and sent to OpenAI transcription API.
- Only transcript text and timestamp are saved in database.
- Client-side checks enforce the "< 1 minute" audio rule before upload.
