import os
from dotenv import load_dotenv

load_dotenv()

OR_API_KEY: str | None = os.getenv("OR_KEY")
DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./anra.db")
DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "anthropic/claude-3.5-haiku")
DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
ANRA_PHASE: int = int(os.getenv("ANRA_PHASE", "4"))

if not OR_API_KEY:
    print(
        "\n⚠️  WARNING: OR_KEY is not set in backend/.env\n"
        "   AI features will not work until you add your OpenRouter key.\n"
        "   Copy backend/.env.example → backend/.env and fill in OR_KEY.\n"
    )
