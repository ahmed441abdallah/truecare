# TrueCare (Health Care)

Next.js healthcare web app for **TrueCare**: marketing pages, patient onboarding, appointment booking, an admin dashboard, AI health chat, and daily wellness recommendations. The UI is largely **Arabic (RTL-friendly)**.

## Features

### Public site

- **Home** — Animated hero, about section, expertise carousel, how-it-works steps, featured doctors, testimonials, FAQ, and a floating **chat shortcut** to the AI assistant.
- **About, Services, Doctors, Contact** — Informational pages; services highlight consultations, scheduling, follow-up, and patient/doctor support.
- **SEO** — Metadata, Open Graph, `sitemap.ts`, `robots.ts`, and structured data helpers under `lib/seo` and `components/seo`.

### Patient flow

- **Get started** (`/getstart`) — Patient registration via `PataintForm`; data is stored in **Appwrite** (server actions create users and patient records).
- **Appointments** (`/patients/[userId]/new-appointment`) — Book visits with date/time and doctor selection; **success** page after submission.
- Optional **admin entry** on get-started: `?admin=true` opens a **passkey** gate for staff.

### Admin dashboard

- **`/admin`** — Overview in Arabic: counts for **scheduled**, **pending**, and **cancelled** appointments, plus a **data table** to review appointments and update status (including cancellation reasons).

### AI assistant

- **`/chat`** — Streaming chat backed by **Groq** (`llama-3.1-8b-instant`) through the Vercel AI SDK (`/api/chat`). Suitable for general wellness-style questions (not a substitute for professional medical advice).
- **`ChatbotButton`** on the home page links users into the chat experience.

### Daily recommendations

- **`/recommendations`** — Interactive **health metrics** form (sleep, heart rate, activity, nutrition, mood, goals, etc.) with **rule-based insights**: recovery status, risk hints, and suggestions for exercise, nutrition, and stress (client-side analysis in `lib/health-insights` patterns).

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript  
- **UI:** Tailwind CSS 4, Radix UI, Motion, Lucide / Tabler icons  
- **Forms:** React Hook Form, Zod  
- **Backend:** Appwrite (client + `node-appwrite` on the server)  
- **AI:** `@ai-sdk/groq`, `ai`, `@ai-sdk/react`

## Getting started

```bash
cd health-care
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` in `health-care` (do not commit secrets). Typical variables used by the app:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_ENDPOINT_URL` or `ENDPOINT_URL` | Appwrite API endpoint |
| `NEXT_PUBLIC_PROJECT_ID` or `PROJECT_ID` | Appwrite project ID |
| `DATABASE_ID` | Appwrite database ID |
| `PATIENTS_TABLE_ID`, `DOCTORS_TABLE_ID`, `APPOINTMENTS_TABLE_ID` | Collection IDs |
| `BUCKET_ID` | Storage bucket (if used for uploads) |
| `API_KEY` or `APPWRITE_API_KEY` | Server API key for user creation and database admin operations |
| `GROQ_API_KEY` | Groq API key for `/api/chat` |

If `API_KEY` / `APPWRITE_API_KEY` is missing, server actions that call Appwrite admin APIs will fail. If `GROQ_API_KEY` is missing, the chat API returns an error.

## Scripts

- `npm run dev` — Development server  
- `npm run build` — Production build  
- `npm run start` — Run production server  
- `npm run lint` — ESLint  

## Project layout (high level)

- `app/` — Routes (marketing, patients, admin, chat, API)  
- `components/` — UI, forms, tables, layout  
- `lib/actions/` — Server actions (patients, appointments)  
- `lib/appwrite.config.ts` — Appwrite client/server setup  
- `types/` — TypeScript types for Appwrite and health models  

---

**Disclaimer:** Content and tools in this app are for demonstration and general wellness information only. They do not replace diagnosis or treatment by a licensed clinician.
