from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from routes.configs.deps import get_db_session
from routes.docs.interlocutor import (
    INTERLOCUTOR_DELETE_EVENT, 
    INTERLOCUTOR_GET_EVENTS
)
from schemas.event import EventResponse
from useCases.client import ClientUseCases


router = APIRouter(prefix='/interlocutor', tags=['Interlocutor'])


@router.get('/get-events', description=INTERLOCUTOR_GET_EVENTS)
async def get_all_events_from_interlocutor(
    client_id: str,
    db_session: Session = Depends(get_db_session)
) -> list[EventResponse]:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.get_all_events_from_interlocutor(client_id)
    
    return result


@router.delete('/delete-event', description=INTERLOCUTOR_DELETE_EVENT)
async def delete_event_from_interlocutor(
    event_id: str,
    db_session: Session = Depends(get_db_session)
) -> dict:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.delete_event_from_interlocutor(event_id)
    
    return result

