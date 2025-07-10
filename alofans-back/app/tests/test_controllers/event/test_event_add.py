from copy import copy
from fastapi import HTTPException
from passlib.context import CryptContext
from pytest import raises


from constants.event import ERROR_CONFLICT_CPF_CNPJ_WITH_PHONE, ERROR_EVENT_ALREADY_EXISTS, MESSAGE_EVENT_ADD_SUCCESS
from useCases.event import EventUseCases
from db.models import (
    Client as ClientModel,
    Event as EventModel,
    EventsFromProducer,
    EventsFromInterlocutor
    )
from enums.user import UserLevel
from schemas.event import EventRequest
from services.ids import id_generate
from services.image import delete_image


crypt_context = CryptContext(schemes=['sha256_crypt'])


def test_add_event_presencial_success(db_session, mock_EventRequest, mock_UploadFile):
    uc = EventUseCases(db_session)

    result = uc.add(mock_EventRequest, mock_UploadFile)
    assert result.detail == MESSAGE_EVENT_ADD_SUCCESS

    event_on_db = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()
    
    assert event_on_db is not None
    
    assert event_on_db.name == mock_EventRequest.name
    assert event_on_db.description == mock_EventRequest.description
    assert event_on_db.alo_cost == mock_EventRequest.alo_cost
    assert event_on_db.alo_quantity == mock_EventRequest.alo_quantity
    
    delete_image("event", event_on_db.id)    

            
def test_add_event_online_success(db_session, mock_EventRequest, mock_UploadFile):
    
    uc = EventUseCases(db_session)
    
    event_request = EventRequest(**mock_EventRequest.dict())
    
    event_request.is_online = True
    event_request.link="link.test.fail"
    event_request.neighborhood = ""
    event_request.street = ""
    
    
    result = uc.add(event_request, mock_UploadFile)

    assert result.detail == MESSAGE_EVENT_ADD_SUCCESS

    event_on_db = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()
    
    assert event_on_db is not None
    
    assert event_on_db.name == mock_EventRequest.name
    assert event_on_db.description == mock_EventRequest.description
    assert event_on_db.alo_cost == mock_EventRequest.alo_cost
    assert event_on_db.alo_quantity == mock_EventRequest.alo_quantity
    assert event_on_db.is_online == event_request.is_online
    assert event_on_db.link == event_request.link
    assert event_on_db.neighborhood == None
    assert event_on_db.street == None
    
    delete_image("event", event_on_db.id)    

            
def test_add_event_in_help_tables(db_session, mock_EventRequest, mock_UploadFile):
    
    uc = EventUseCases(db_session)
    
    event_request = EventRequest(**mock_EventRequest.dict())
    
    event_request.is_online = True
    event_request.link="link.test.fail"
    event_request.neighborhood = ""
    event_request.street = ""
    
    result = uc.add(event_request, mock_UploadFile)

    assert result.detail == MESSAGE_EVENT_ADD_SUCCESS
    
    producer = db_session.query(ClientModel).filter_by(cpf_cnpj=event_request.producer_cpf_cnpj).first()
    interlocutor = db_session.query(ClientModel).filter_by(cpf_cnpj=event_request.interlocutor_cpf_cnpj).first()
    
    event_on_db = db_session.query(EventModel).filter_by(name=event_request.name).first()
    assert event_on_db is not None
    efp = db_session.query(EventsFromProducer).filter_by(producer_id=producer.id).first()
    assert efp is not None
    efi = db_session.query(EventsFromInterlocutor).filter_by(interlocutor_id=interlocutor.id).first()
    assert efi is not None
    
    db_session.delete(event_on_db)
    db_session.commit()
    
    efp = db_session.query(EventsFromProducer).filter_by(producer_id=producer.id).first()
    assert efp is  None
    efi = db_session.query(EventsFromInterlocutor).filter_by(interlocutor_id=interlocutor.id).first()
    assert efi is  None


def test_add_event_already_exists_fail(db_session, mock_EventRequest, mock_UploadFile):
    
    try:
        uc = EventUseCases(db_session)
        event_request = EventRequest(**mock_EventRequest.dict())

        with raises(HTTPException) as e:
            uc.add(event_request, mock_UploadFile)
            uc.add(event_request, mock_UploadFile)
            
        assert e.value.status_code == 409
        assert e.value.detail == ERROR_EVENT_ALREADY_EXISTS
       
    finally:

        event_on_db = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()

        if event_on_db:
            delete_image("event", event_on_db.id)   

def test_add_event_not_register_interlocutor(db_session, mock_EventRequest, mock_UploadFile):
    
    try:
        
        interlocutor = ClientModel(
            id=id_generate(),
            name="Teste",
            phone="86612341234",
            email="test@gmail.com",
            password=crypt_context.hash("123"),
            level=UserLevel.client.value
        )
        
        db_session.add(interlocutor)
        db_session.commit()
        db_session.refresh(interlocutor)
        
        uc = EventUseCases(db_session)
        event_request = EventRequest(**mock_EventRequest.dict())

        event_request.interlocutor_cpf_cnpj = "999.999.666-33"
        event_request.interlocutor_phone = interlocutor.phone
        
        response = uc.add(event_request, mock_UploadFile)
       
        assert response.detail == MESSAGE_EVENT_ADD_SUCCESS
       
        event_on_db = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()
        assert event_on_db is not None
        assert event_on_db.name == mock_EventRequest.name
        assert event_on_db.description == mock_EventRequest.description
        assert event_on_db.alo_cost == mock_EventRequest.alo_cost
        assert event_on_db.alo_quantity == mock_EventRequest.alo_quantity
        assert event_on_db.is_online == mock_EventRequest.is_online
        assert event_on_db.link == mock_EventRequest.link
        assert event_on_db.state == mock_EventRequest.state
        assert event_on_db.city == mock_EventRequest.city
        assert event_on_db.neighborhood == mock_EventRequest.neighborhood
        assert event_on_db.street == mock_EventRequest.street
        assert event_on_db.address_number == mock_EventRequest.address_number
        assert event_on_db.complement == mock_EventRequest.complement
        assert event_on_db.producer_cpf_cnpj == mock_EventRequest.producer_cpf_cnpj
        
        interlocutor_in_db = db_session.query(ClientModel).filter_by(cpf_cnpj=event_request.interlocutor_cpf_cnpj).first()
        
        assert interlocutor_in_db is not None
        assert interlocutor_in_db.name == "Teste"
        assert interlocutor_in_db.phone == "86612341234"
        assert interlocutor_in_db.level == UserLevel.interlocutor.value
       
    finally:
        event_on_db = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()
        if event_on_db:
            delete_image("event", event_on_db.id)   
            
def test_add_event_switch_interlocutor_cpf(db_session, mock_EventRequest, mock_UploadFile):
    """
    Quando o interlocutor não está cadastrado, o evento não pode ser cadastrado, mas caso seja passado o telefone e um cpf para o interlocutor. Cadastramos o interlocutor
    """
    
    interlocutor_phone = "86612341234"
    
    interlocutor = ClientModel(
        id=id_generate(),
        name="Teste",
        phone=interlocutor_phone,
        email="bug@bug.bug",
        password=crypt_context.hash("bug"),
        level=UserLevel.interlocutor.value,
        cpf_cnpj="999.999.666-37"
    )
    
    db_session.add(interlocutor)
    db_session.commit()
    
    event_request = EventRequest(**mock_EventRequest.dict())
    
    event_request.interlocutor_cpf_cnpj = "244.244.244-42"
    event_request.interlocutor_phone = interlocutor_phone
    event_request.interlocutor_pixkey = interlocutor_phone
    event_request.interlocutor_pixkeytype = "CPF"
    event_request.interlocutor_percent = 0.1
    
    uc = EventUseCases(db_session)
    
    with raises(HTTPException) as e:
        uc.add(event_request, mock_UploadFile)
    
    assert e.value.status_code == 409
    assert e.value.detail == ERROR_CONFLICT_CPF_CNPJ_WITH_PHONE
    
    
def test_add_event_switch_interlocutor_cpf_success(db_session, mock_EventRequest, mock_UploadFile):
    """
    Quando o interlocutor não está cadastrado, o evento não pode ser cadastrado, mas caso seja passado o telefone e um cpf para o interlocutor. Cadastramos o interlocutor
    """
    
    interlocutor_phone = "86612341234"
    
    interlocutor = ClientModel(
        id=id_generate(),
        name="Teste",
        phone=interlocutor_phone,
        email="bug@bug.bug",
        password=crypt_context.hash("bug"),
        level=UserLevel.interlocutor.value,
        cpf_cnpj="999.999.666-37"
    )
    
    db_session.add(interlocutor)
    db_session.commit()
    
    interlocutor_2 = ClientModel(
        id=id_generate(),
        name="Teste",
        phone="86612341232",
        email="bug@bug.bug2",
        password=crypt_context.hash("bug"),
        level=UserLevel.client.value,
    )
    
    db_session.add(interlocutor_2)
    db_session.commit()
    
    event_request: EventRequest = copy(mock_EventRequest)
    
    event_request.interlocutor_cpf_cnpj = interlocutor.cpf_cnpj
    event_request.interlocutor_phone = interlocutor_phone
    event_request.interlocutor_pixkey = interlocutor_phone
    event_request.interlocutor_pixkeytype = "CPF"
    event_request.interlocutor_percent = 0.1
    
    uc = EventUseCases(db_session)
    

    response = uc.add(event_request, mock_UploadFile)

    assert response.detail == MESSAGE_EVENT_ADD_SUCCESS
    
    interlocutor_in_db = db_session.query(ClientModel).filter_by(cpf_cnpj=interlocutor.cpf_cnpj).first()
    
    assert interlocutor_in_db is not None
    assert interlocutor_in_db.name == "Teste"
    assert interlocutor_in_db.phone == interlocutor_phone
    assert interlocutor_in_db.level == UserLevel.interlocutor.value
    
    event_on_db = db_session.query(EventModel).filter_by(name=mock_EventRequest.name).first()
    assert event_on_db is not None
    assert event_on_db.name == mock_EventRequest.name
    assert event_on_db.description == mock_EventRequest.description
    assert event_on_db.alo_cost == mock_EventRequest.alo_cost
    