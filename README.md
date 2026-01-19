# AI Practice Platform (POC)

A LeetCode-style platform focused on helping people learn how to use AI in their daily workflow.

## Stack

- Frontend: Next.js (App Router, TypeScript, Tailwind)
- Backend: FastAPI (Python, SQLAlchemy)
- Data: Postgres
- AI: Local LLM (e.g., Ollama) via simple HTTP client

## Running locally

1. Create a Supabase project and copy the Postgres connection string.
2. Backend:
   - `cd backend`
   - `python3 -m venv .venv && source .venv/bin/activate` (or use the repo root venv)
   - `pip install -r requirements.txt`
   - Create a `.env` file in `backend/` with:
     - `SQL_DATABASE_URL=postgresql+psycopg2://postgres:<PASSWORD>@db.<HASH>.supabase.co:5432/postgres`
   - (Optional, first time) create tables:
     - `python init_db.py`
   - Run the API:
     - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
3. Frontend:
   - `cd frontend`
   - `npm install` (first run)
   - `npm run dev`

Then open `http://localhost:3000` in your browser.

This is a proof-of-concept; auth and AI calls are implemented in a simplified way and should be hardened for production.
