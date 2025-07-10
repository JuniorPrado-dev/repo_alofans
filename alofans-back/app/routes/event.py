from fastapi import(
    APIRouter, 
    Depends, 
    File, 
    Form, 
    HTTPException, 
    UploadFile
)
from json import loads
from sqlalchemy.orm import Session



from schemas.base import BaseMessage
from useCases.event import EventUseCases
from routes.docs.event import (
    EVENT_ADD,
    EVENT_DELETE,
    EVENT_GET,
    EVENT_LIST,
    EVENT_LIST_ALL,
    EVENT_UPDATE
)
from schemas.event import EventResponse
from schemas.event import (
    EventRequest,
    EventUpDate
)
from routes.configs.deps import get_db_session


router = APIRouter(prefix='/event', tags=['Event'])

 
@router.post("/add", description=EVENT_ADD, status_code=201, response_model=BaseMessage)
async def add_event(
    image: UploadFile=File(),
    event_data:str= Form(),
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    """
    Para enviar os dados do evento, deve-se fazer em formato de json, em uma única linha do swagger, caso contrário não da pra enviar
    """
    
    try:
        event_data = loads(event_data)

        event_data:EventRequest = EventRequest(**event_data)


    except Exception as e:
        raise HTTPException(400, f"Invalid data: {str(e)}")

    uc = EventUseCases(db_session=db_session)
    
    response = uc.add(event_data,image=image)

    return response

@router.get("/get", description=EVENT_GET, status_code=200)
async def get_event(
    event_id: str,
    db_session: Session = Depends(get_db_session)
) -> EventResponse:
    
    uc = EventUseCases(db_session=db_session)

    response = uc.get(event_id)
    
    return response

@router.get('/list', description=EVENT_LIST,status_code=200)
async def list_events(
    db_session: Session = Depends(get_db_session)
) -> list[EventResponse]:
    uc = EventUseCases(db_session=db_session)
    response = uc.get_all()
    
    return response

@router.get('/list/all', description=EVENT_LIST_ALL, status_code=200)
async def list_events(
    db_session: Session = Depends(get_db_session)
) -> list[EventResponse]:
    
    uc = EventUseCases(db_session=db_session)

    response = uc.get_all_db()
    
    return response


@router.put('/update', description=EVENT_UPDATE)
async def update_event(
    event_id: str = Form(),
    image: UploadFile = File(None),
    event_update: str = Form(...),
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    try:
        event_data = loads(event_update)
        event_data = EventUpDate(**event_data)
    except Exception as e:

        raise HTTPException(400, f"Invalid data: {str(e)}")
    
    uc = EventUseCases(db_session=db_session)
    response = uc.update(event_id, event_data, image)

    return response

@router.delete('/delete', description=EVENT_DELETE)
async def delete(
    event_id: str,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = EventUseCases(db_session=db_session)

    response = uc.delete(event_id)

    return response

