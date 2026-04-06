from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import init_db
from routes.chat import router as chat_router
from routes.health import router as health_router
from routes.vault import router as vault_router

app = FastAPI(title="AN-RA Workspace API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(health_router)
app.include_router(chat_router, prefix="/chat")
app.include_router(vault_router, prefix="/vault")


@app.on_event("startup")
def on_startup():
    init_db()
    print("\nAN-RA Backend running — http://localhost:8000")
    print("API docs — http://localhost:8000/docs\n")
