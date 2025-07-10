from fastapi import HTTPException
from pytest import raises

from constants.event import (
    ERROR_EVENT_NOT_FOUND, 
    MESSAGE_EVENT_UPDATE_SUCCESS
)
from db.models import Event as EventModel
from utils.timezone import utc_to_sao_paulo_ymd
from useCases.event import EventUseCases

def test_event_update_success(db_session, mock_event_on_db, mock_EventUpDate):
    
    uc = EventUseCases(db_session)

    result = uc.update(mock_event_on_db.id,mock_EventUpDate)
        
    result.detail == MESSAGE_EVENT_UPDATE_SUCCESS
    
    event = db_session.query(EventModel).filter_by(id=mock_event_on_db.id).first()
    
    assert event is not None
    assert event.name == mock_EventUpDate.name
    assert utc_to_sao_paulo_ymd(event.date) == mock_EventUpDate.date
    assert event.description == mock_EventUpDate.description
    assert event.alo_cost == mock_EventUpDate.alo_cost
    assert event.alo_quantity == mock_EventUpDate.alo_quantity
    assert event.interlocutor_cpf_cnpj == mock_EventUpDate.interlocutor_cpf_cnpj
    
    


def test_update_event_error(db_session, mock_EventUpDate):
    uc = EventUseCases(db_session)

    with raises(HTTPException) as e:
        uc.update("abacate",  mock_EventUpDate)
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_EVENT_NOT_FOUND
