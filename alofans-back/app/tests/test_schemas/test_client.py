from fastapi import HTTPException
from pytest import raises

from constants.person import (
    ERROR_CLIENT_INVALID_EMAIL,
    ERROR_CLIENT_REQUIRED_FIELD_EMAIL
)
from schemas.client import ClientRequest

def test_ClientRequest_success():
    client = ClientRequest(
        google_id="google_id",
        name="Name",
        password="Password",
        phone="Phone",
        email="Email@gmail.com",
        
    )
    assert client.google_id == "google_id"
    assert client.name == "Name"
    assert client.password == "Password"
    assert client.phone == "Phone"
    assert client.email == "Email@gmail.com"
    

def test_ClientRequest_no_email():
    with raises(HTTPException) as exception:
        ClientRequest(
            google_id="google_id",
            name="Name",
            password="Password",
            phone="Phone",
            email=None,
        )
    assert exception.value.status_code == 422
    assert exception.value.detail == ERROR_CLIENT_REQUIRED_FIELD_EMAIL

def test_ClientRequest_invalid_email():
    with raises(HTTPException) as exception:
        ClientRequest(
            google_id="google_id",
            name="Name",
            password="Password",
            phone="Phone",
            email="email",
        )
    assert exception.value.status_code == 422
    assert exception.value.detail == ERROR_CLIENT_INVALID_EMAIL
    
def test_ClientRequest_no_phone():
    with raises(HTTPException) as exception:
        ClientRequest(
            google_id="google_id",
            name="Name",
            password="Password",
            phone="",
            email="Email@gmail.com",
        )
    assert exception.value.status_code == 422
    assert exception.value.detail == "Telefone é obrigatório"
    
def test_ClientRequest_no_password():
    with raises(HTTPException) as exception:
        ClientRequest(
            google_id="google_id",
            name="Name",
            password="",
            phone="12312312",
            email="Email@gmail.com",
        )
    assert exception.value.status_code == 422
    assert exception.value.detail == "Senha é obrigatória"
    
