# AN-RA Workspace

A local-first AI workspace application with a FastAPI Python backend and a React + Vite frontend.

---

## Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | FastAPI, Python, Uvicorn            |
| Frontend  | React 18, Vite, Plain JS            |
| Database  | SQLite via SQLAlchemy               |
| AI        | OpenRouter (via backend only)       |
| State     | Zustand (frontend)                  |

---

## Quick Start

### 1 — Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Fill in your OR_KEY
uvicorn app:app --reload --port 8000
```

### 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3 — Open the app

```
http://localhost:5173
```

---

## Environment

Copy `backend/.env.example` to `backend/.env` and fill in your values.

```env
OR_KEY=sk-or-v1-your-openrouter-key
DATABASE_URL=sqlite:///./anra.db
DEFAULT_MODEL=anthropic/claude-3.5-haiku
DEBUG=true
ANRA_PHASE=4
```

> ⚠️ **Never commit `.env`** — it is gitignored. Only `.env.example` belongs in source control.

---

## Architecture Rules

### NEVER DO
1. Never put API keys in any JS or frontend file
2. Never call OpenRouter (or any AI API) from the frontend
3. Never use `fetch()` outside of `src/api.js`
4. Never hardcode `localhost:8000` in any React component
5. Never bypass the proxy — all `/api/*` routes go through Vite → FastAPI
6. Never commit `.env` or any file containing real credentials

### ALWAYS DO
1. All API keys live exclusively in `backend/.env`
2. All AI calls go through `backend/services/ai_client.py`
3. All frontend HTTP calls go through `src/api.js`
4. All frontend → backend communication uses `/api/*` prefix
5. Keep `backend/` and `frontend/` fully independent — no shared files
6. Use `.env.example` as the documented contract for environment config
