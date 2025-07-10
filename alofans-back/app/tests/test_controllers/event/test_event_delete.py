from fastapi import HTTPException
from pytest import raises

from constants.event import (
    ERROR_EVENT_NOT_FOUND,
    MESSAGE_EVENT_ADD_SUCCESS,
    MESSAGE_EVENT_DELETE_SUCCESS
)
from db.models import (
    Client as ClientModel,
    Event as EventModel,
    EventsFromProducer,
    EventsFromInterlocutor
)
from useCases.event import EventUseCases

def test_event_delete_success(db_session, mock_event_on_db):
    uc = EventUseCases(db_session)

    result = uc.delete(mock_event_on_db.id)
        
    result.detail == MESSAGE_EVENT_DELETE_SUCCESS
    
    event = db_session.query(EventModel).filter_by(id=mock_event_on_db.id).first()
    
    assert event is None

def test_remove_event_and_cascade_help_tables(db_session, mock_EventRequest, mock_UploadFile):
    
    uc = EventUseCases(db_session)
    
    response = uc.add(mock_EventRequest, mock_UploadFile)
    
    assert response.detail == MESSAGE_EVENT_ADD_SUCCESS
    
    producer = db_session.query(ClientModel).filter_by(cpf_cnpj=mock_EventRequest.producer_cpf_cnpj).first()
    
    interlocutor = db_session.query(ClientModel).filter_by(cpf_cnpj=mock_EventRequest.interlocutor_cpf_cnpj).first()
    
    producer = db_session.query(ClientModel).filter_by(cpf_cnpj=mock_EventRequest.producer_cpf_cnpj).first()
    
    event = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()
    
    efp = db_session.query(EventsFromProducer).filter_by(producer_id=producer.id).first()
    assert efp is not None
    efp.event_id == event.id
    efi = db_session.query(EventsFromInterlocutor).filter_by(interlocutor_id=interlocutor.id).first()
    assert efi is not None
    efi.event_id == event.id

    result = uc.delete(event.id)
        
    result.detail == MESSAGE_EVENT_DELETE_SUCCESS
    
    event = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()
    assert event is None
    
    efp = db_session.query(EventsFromProducer).filter_by(producer_id=producer.id).first()
    assert efp is None
    efi = db_session.query(EventsFromInterlocutor).filter_by(interlocutor_id=interlocutor.id).first()
    assert efi is None
    
def test_delete_event_error(db_session, mock_event_on_db):
    uc = EventUseCases(db_session)

    with raises(HTTPException) as e:
        uc.delete("abacate")
        
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_EVENT_NOT_FOUND