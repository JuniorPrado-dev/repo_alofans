from fastapi import HTTPException
from pytest import raises


from schemas.alo import AloRequest

def test_AloRequest_success():
    alo = AloRequest(
        text_message="Alo",
        payment_value=10.0,
        client_id="123",
        event_id="123"
    )
    assert alo.text_message == "Alo"
    assert alo.payment_value == 10.0
    assert alo.client_id == "123"
    assert alo.event_id == "123"
    
def test_AloRequest_fail_text_message():
    
    with raises(HTTPException) as exception:
        AloRequest(
            text_message="",
            payment_value=10.0,
            client_id="123",
            event_id="123"
        )
    
    assert exception.value.status_code == 422
    assert exception.value.detail == "Informe a mensagem do Alo"
    
def test_AloRequest_fail_payment_value():
    
    with raises(HTTPException) as exception:
        AloRequest(
            text_message="Alo",
            payment_value=None,
            client_id="123",
            event_id="123"
        )
    
    assert exception.value.status_code == 422
    assert exception.value.detail == "Informe o valor do Alo"
    
def test_AloRequest_fail_client_id():
    
    with raises(HTTPException) as exception:
        AloRequest(
            text_message="Alo",
            payment_value=10.0,
            client_id=None,
            event_id="123"
        )
    
    assert exception.value.status_code == 422
    assert exception.value.detail == "Informe o ID do cliente"
    
def test_AloRequest_fail_event_id():
    
    with raises(HTTPException) as exception:
        AloRequest(
            text_message="Alo",
            payment_value=10.0,
            client_id="123",
            event_id=None
        )
    
    assert exception.value.status_code == 422
    assert exception.value.detail == "Informe o ID do evento"