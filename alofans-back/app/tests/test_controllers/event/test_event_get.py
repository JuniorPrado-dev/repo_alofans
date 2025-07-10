from fastapi import HTTPException
from pytest import raises


from constants.event import (
    ERROR_EVENT_NOT_FOUND,
    ERROR_EVENT_NO_ID
)
from useCases.event import EventUseCases
from schemas.event import(
    EventResponse
)
from utils.timezone import utc_to_sao_paulo_ymd


def test_event_get_success(db_session, mock_event_on_db):

    event = EventUseCases(db_session)

    event_id = mock_event_on_db.id

    response = event.get(event_id)

    assert isinstance(response, EventResponse)
    assert response.id == event_id
    assert response.name == mock_event_on_db.name
    assert response.description == mock_event_on_db.description
    assert response.date == utc_to_sao_paulo_ymd(mock_event_on_db.date)
    assert response.alo_cost == mock_event_on_db.alo_cost
    assert response.alo_quantity == mock_event_on_db.alo_quantity
    assert response.link == mock_event_on_db.link
    assert response.state == mock_event_on_db.state
    assert response.city == mock_event_on_db.city
    assert response.neighborhood == mock_event_on_db.neighborhood
    assert response.street == mock_event_on_db.street
    assert response.address_number == mock_event_on_db.address_number
    assert response.complement == mock_event_on_db.complement
    assert response.producer_cpf_cnpj == mock_event_on_db.producer_cpf_cnpj
    assert response.interlocutor_cpf_cnpj == mock_event_on_db.interlocutor_cpf_cnpj
    assert response.interlocutor_pixkey == mock_event_on_db.interlocutor_pixkey
    assert response.interlocutor_percent == mock_event_on_db.interlocutor_percent


def test_event_get_fail_no_id(db_session):

    event = EventUseCases(db_session)

    with raises(HTTPException) as e:

        event.get(None)

    assert e.value.status_code == 400
    assert e.value.detail == ERROR_EVENT_NO_ID


def test_event_get_fail_invalid_id(db_session):

    event = EventUseCases(db_session)

    with raises(HTTPException) as e:

        event.get("None")

    assert e.value.status_code == 404
    assert e.value.detail == ERROR_EVENT_NOT_FOUND