from fastapi import APIRouter
from config import ANRA_PHASE

router = APIRouter()


@router.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "AN-RA Backend",
        "phase": ANRA_PHASE,
    }
