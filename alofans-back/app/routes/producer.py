from fastapi import (
    APIRouter, 
    Depends
)
from sqlalchemy.orm import Session


from routes.configs.deps import get_db_session
from routes.docs.producer import (
    PRODUCER_GET_EVENTS, 
    PRODUCER_DELETE_EVENTS
)
from schemas.event import EventResponse
from useCases.client import ClientUseCases


router = APIRouter(prefix='/producer', tags=['Producer'])

@router.get('/get-events', description=PRODUCER_GET_EVENTS)
async def get_all_events_from_producer(
    client_id: str,
    db_session: Session = Depends(get_db_session)
) -> list[EventResponse]:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.get_all_events_from_producer(client_id)
    
    return result

@router.delete('/delete-event', description=PRODUCER_DELETE_EVENTS)
async def delete_event_from_producer(
    event_id: str,
    db_session: Session = Depends(get_db_session)
) -> dict:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.delete_event_from_producer(event_id)
    
    return result

