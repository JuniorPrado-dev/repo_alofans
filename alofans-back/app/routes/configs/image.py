from fastapi import APIRouter
from fastapi.responses import FileResponse
from services.image import get_image_from_URL
router = APIRouter(prefix='/image')

@router.get("/",description='Retorna imagem pela URL')
async def get_image(path:str) -> FileResponse:
    return get_image_from_URL(image_url=path)
