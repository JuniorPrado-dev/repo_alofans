from fastapi import HTTPException
from pytest import raises


from useCases.client import ClientUseCases


def test_get_all_events_from_producer(
    db_session, 
    mock_EventsFromProducer_andEventsFromInterlocutor):
    
    efp, efi = mock_EventsFromProducer_andEventsFromInterlocutor
    
    uc = ClientUseCases(db_session)

    result = uc.get_all_events_from_producer(efp.producer_id)

    assert result is not None
    assert len(result) == 1
    assert result[0].id == efp.event_id
    
def test_delete_event_from_producer(
    db_session, 
    mock_EventsFromProducer_andEventsFromInterlocutor):
    
    efp, efi = mock_EventsFromProducer_andEventsFromInterlocutor
    
    uc = ClientUseCases(db_session)

    response = uc.delete_event_from_producer(efp.event_id)
    
    assert response.detail == "Evento removido com sucesso"
    
    with raises(HTTPException) as exception:
        uc.get_all_events_from_producer(efp.producer_id)
    
    assert exception.value.status_code == 404
    assert exception.value.detail == "Eventos não encontrados"
    
def test_delete_event_from_producer_invalid_id(
    db_session, 
    mock_EventsFromProducer_andEventsFromInterlocutor):
    
    efp, efi = mock_EventsFromProducer_andEventsFromInterlocutor
    
    uc = ClientUseCases(db_session)

    with raises(HTTPException) as exception:
        uc.delete_event_from_producer("invalid_id")
    
    assert exception.value.status_code == 404
    assert exception.value.detail == "Evento não encontrado"
    
def test_get_all_events_from_interlocutor(
    db_session, 
    mock_EventsFromProducer_andEventsFromInterlocutor):
    
    efp, efi = mock_EventsFromProducer_andEventsFromInterlocutor
    
    uc = ClientUseCases(db_session)

    result = uc.get_all_events_from_interlocutor(efi.interlocutor_id)

    assert result is not None
    assert len(result) == 1
    assert result[0].id == efi.event_id
    
def test_delete_event_from_interlocutor(
    db_session, 
    mock_EventsFromProducer_andEventsFromInterlocutor):
    
    efp, efi = mock_EventsFromProducer_andEventsFromInterlocutor
    
    uc = ClientUseCases(db_session)

    response = uc.delete_event_from_interlocutor(efi.id)
    
    assert response.detail == "Evento removido com sucesso"
    
    with raises(HTTPException) as exception:
        uc.get_all_events_from_interlocutor(efi.interlocutor_id)
    
    assert exception.value.status_code == 404
    assert exception.value.detail == "Eventos não encontrados"
    
def test_delete_event_from_interlocutor_invalid_id(
    db_session, 
    mock_EventsFromProducer_andEventsFromInterlocutor):
    
    efp, efi = mock_EventsFromProducer_andEventsFromInterlocutor
    
    uc = ClientUseCases(db_session)

    with raises(HTTPException) as exception:
        uc.delete_event_from_interlocutor("invalid_id")
    
    assert exception.value.status_code == 404
    assert exception.value.detail == "Evento não encontrado"
    