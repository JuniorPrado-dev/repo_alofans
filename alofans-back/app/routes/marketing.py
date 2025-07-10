from fastapi import (
    APIRouter, 
    Depends, 
    File, 
    Form, 
    HTTPException, 
    UploadFile, 
    status
)
from sqlalchemy.orm import Session
from json import loads


from routes.configs.deps import get_db_session
from routes.docs.marketing import (
    MARKETING_ADD,
    MARKETING_DELETE,
    MARKETING_GET,
    MARKETING_GET_BY_ADDRESS,
    MARKETING_LIST
)
from schemas.base import BaseMessage
from schemas.marketing import(
    MarketingRequest,
    MarketingResponse
)
from useCases.marketing import MarketingUseCases


router = APIRouter(prefix='/marketing', tags=['Marketing'])


@router.post("/add", description=MARKETING_ADD)
async def add_marketing(
    image: UploadFile=File(...),
    marketing_data: str=Form(...),
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    uc = MarketingUseCases(db_session)
    
    try:
        marketing_data = loads(marketing_data)
        marketing_data:MarketingRequest = MarketingRequest(**marketing_data)
    except Exception as e:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, str(e))
    
    response = uc.add_marketing(marketing_data, image)
    
    return response

@router.get("/all", description=MARKETING_LIST)
async def list_all_marketing(
    db_session: Session = Depends(get_db_session)
) -> list[MarketingResponse]:
    
    uc = MarketingUseCases(db_session)
    
    result = uc.list_all_marketing()
    
    return result

@router.get("/get-id", description=MARKETING_GET)
async def get_marketing_by_id(
    marketing_id:str,
    db_session: Session = Depends(get_db_session)
    ) -> MarketingResponse:

    uc = MarketingUseCases(db_session)
    
    result = uc.get_marketing_by_id(marketing_id)
    
    return result


@router.get("/get-address", description=MARKETING_GET_BY_ADDRESS)
async def get_marketing_by_address(
    state:str,
    city:str | None = None,
    db_session: Session = Depends(get_db_session)
    ) -> list[MarketingResponse]:

    uc = MarketingUseCases(db_session)
    
    result = uc.get_marketing_by_address(state, city)
    
    return result

@router.delete('/delete', description=MARKETING_DELETE)
async def delete_marketing(
    marketing_id: str,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = MarketingUseCases(db_session=db_session)

    result = uc.delete_marketing(marketing_id)
    
    return result