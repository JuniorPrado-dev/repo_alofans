from fastapi import HTTPException
from pytest import raises

from constants.event import ERROR_EVENTS_NOT_FOUND
from enums.event import EventType
from utils.timezone import utc_to_sao_paulo_ymd
from schemas.event import EventResponse
from useCases.event import (
    EventUseCases, 
    EventModel
)

def test_event_get_all(db_session,mock_event_on_db):
    
    uc = EventUseCases(db_session)
    events = uc.get_all()
    
    event:EventResponse = events[0]
    
    assert len(events) == 1
    assert event.id == mock_event_on_db.id
    assert event.name == mock_event_on_db.name
    assert event.description == mock_event_on_db.description
    assert event.date == utc_to_sao_paulo_ymd(mock_event_on_db.date)
    assert event.alo_cost == mock_event_on_db.alo_cost
    assert event.alo_quantity == mock_event_on_db.alo_quantity
    assert event.link == mock_event_on_db.link
    assert event.state == mock_event_on_db.state
    assert event.city == mock_event_on_db.city
    assert event.neighborhood == mock_event_on_db.neighborhood
    assert event.street == mock_event_on_db.street
    assert event.complement == mock_event_on_db.complement
    assert event.interlocutor_cpf_cnpj == mock_event_on_db.interlocutor_cpf_cnpj
    assert event.producer_cpf_cnpj == mock_event_on_db.producer_cpf_cnpj

    
def test_list_events_with_no_event_in_db(db_session):
    
    uc = EventUseCases(db_session)
    with raises(HTTPException) as e:
        uc.get_all()()
    
    assert e.value.status_code == 404
    assert e.value.detail == ERROR_EVENTS_NOT_FOUND
    

def test_get_list_event_with_old_event(db_session, mock_event_on_db, mock_old_event_on_db):

    uc = EventUseCases(db_session)
    events = uc.get_all()

    assert events is not None

    event = events[0]

    assert len(events) == 1
    assert event.id == mock_event_on_db.id
    assert event.name == mock_event_on_db.name
    assert event.description == mock_event_on_db.description
    assert event.date == utc_to_sao_paulo_ymd(mock_event_on_db.date)
    assert event.alo_cost == mock_event_on_db.alo_cost
    assert event.alo_quantity == mock_event_on_db.alo_quantity
    assert event.type == EventType.offline.value
    assert event.link == mock_event_on_db.link

    all_events = uc.get_all_db()
    assert len(all_events) == 2
    

def test_controller_event_get_all_with_one_old_event_with_no_interlocutor(db_session, mock_old_event_on_db_with_no_interlocutor):

    uc = EventUseCases(db_session)

    with raises(HTTPException) as e:
        uc.get_all()

    assert e.value.status_code == 404
    assert e.value.detail == ERROR_EVENTS_NOT_FOUND


def test_controller_event_get_all_with_one_old_event_with_interlocutor(db_session, mock_old_event_on_db_with_interlocutor):

    uc = EventUseCases(db_session)

    with raises(HTTPException) as e:
        uc.get_all()

    assert e.value.status_code == 404
    assert e.value.detail == ERROR_EVENTS_NOT_FOUND

