from unicodedata import ucd_3_2_0
from decouple import config
from fastapi.exceptions import HTTPException
from passlib.context import CryptContext
import pytest


from constants.person import (
    ERROR_CLIENT_LOGIN_INVALID_PASSWORD, 
    ERROR_CLIENT_LOGIN_NOT_CREDENTIALS, 
    ERROR_CLIENT_LOGIN_NOT_FOUND_EMAIL
)
from services.tokens import decode_token
from schemas.client import ClientLogin
from db.models import Client as ClientModel
from useCases.client import ClientUseCases



crypt_context = CryptContext(schemes=['sha256_crypt'])

SECRET_KEY = config('SECRET_KEY')
ALGORITHM = config('ALGORITHM')

def test_login_success_with_google_id_success(db_session, mock_client_on_db):
    """
    Realizando Login com Google ID e obtendo sucesso
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id=mock_client_on_db.google_id,
        email="",
        password=""
    )

    result = uc.login(client_login=client_login)
    
    decoded_token = decode_token(result.token)
    
    assert type(decoded_token.id) == str
    assert decoded_token.id == mock_client_on_db.id
    assert decoded_token.name == mock_client_on_db.name
    assert decoded_token.level == mock_client_on_db.level
    assert decoded_token.email == mock_client_on_db.email
    assert decoded_token.phone == mock_client_on_db.phone
    assert bool(decoded_token.cpf_cnpj) == bool(mock_client_on_db.cpf_cnpj)

def test_login_google_id_not_exist(db_session, mock_client_on_db):
    """
    Testando o erro quando o usuário informa google id não cadastrado
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id= "Abacaxi",
        email="",
        password=""
    )
    
    with  pytest.raises(HTTPException) as e:
        uc.login(client_login=client_login)
        
    assert(e.value.status_code) == 400
    assert(e.value.detail) == ERROR_CLIENT_LOGIN_NOT_FOUND_EMAIL
    
def test_login_google_id_with_google_id_not_register_but_email_is_ok(
    db_session, 
    mock_client_on_db_no_google_id
    ):
    """
    Testando o erro quando o usuário informa google id não cadastrado
    """
    uc = ClientUseCases(db_session)
    
    client_login = ClientLogin(
        google_id="abacaxi",
        email=mock_client_on_db_no_google_id.email
    )
    
    uc.login(client_login)

    client_test = db_session.query(ClientModel).filter_by(email=mock_client_on_db_no_google_id.email).first()
    
    assert client_test is not None
    assert client_test.google_id == client_login.google_id
def test_login_success_with_google_id_fail_but_login_and_password_is_ok(db_session, mock_client_on_db, mock_ClientRequest):
    """
    Realizando Login com Google ID e Falhando, mas funcionando com Login e Senha
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id= "",
        email=mock_client_on_db.email,
        password=mock_ClientRequest.password
    )

    result = uc.login(client_login=client_login)

    
    decoded_token = decode_token(result.token)
    
    assert type(decoded_token.id) == str
    assert decoded_token.id == mock_client_on_db.id
    assert decoded_token.name == mock_client_on_db.name
    assert decoded_token.level == mock_client_on_db.level
    assert decoded_token.email == mock_client_on_db.email
    assert decoded_token.phone == mock_client_on_db.phone
    assert bool(decoded_token.cpf_cnpj) == bool(mock_client_on_db.cpf_cnpj)
        
        
def test_login_fail_email_is_ok_but_password_not(db_session, mock_client_on_db):
    """
    Testando o erro quando o usuário informa somente o email e não passa a senha
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id= "",
        email=mock_client_on_db.email,
        password=""
    )
    
    with  pytest.raises(HTTPException) as e:
        uc.login(client_login=client_login)
        
    assert(e.value.status_code) == 400
    assert(e.value.detail) == ERROR_CLIENT_LOGIN_NOT_CREDENTIALS
    
def test_login_fail_email_is_ok_but_password_not(db_session, mock_client_on_db):
    """
    Testando o erro quando o usuário informa somente a senha e não passa o email
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id= "",
        email="",
        password=mock_client_on_db.password
    )
    
    with  pytest.raises(HTTPException) as e:
        uc.login(client_login=client_login)
        
    assert(e.value.status_code) == 400
    assert(e.value.detail) == ERROR_CLIENT_LOGIN_NOT_CREDENTIALS
    
def test_login_fail_email_and_password_is_not_ok(db_session, mock_client_on_db):
    """
    Testando o erro quando o usuário não informa nada
    """
    uc = ClientUseCases(db_session)
    
    with  pytest.raises(HTTPException) as e:
        client_login = ClientLogin(
            google_id= "",
            email="",
            password=""
        )
        uc.login(client_login=client_login)
        
    assert(e.value.status_code) == 422
    assert(e.value.detail) == ERROR_CLIENT_LOGIN_NOT_CREDENTIALS
    
    
def test_login_fail_email_is_correct_but_password_incorrect(db_session, mock_client_on_db):
    """
    Testando o erro quando o usuário informa email e senha, mas a senha está errada
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id= "",
        email=mock_client_on_db.email,
        password="Abacate"
    )
    
    with  pytest.raises(HTTPException) as e:
        uc.login(client_login=client_login)
        
    assert(e.value.status_code) == 400
    assert(e.value.detail) == ERROR_CLIENT_LOGIN_INVALID_PASSWORD
    
def test_login_fail_email_is_incorrect_but_password_correct(db_session, mock_client_on_db):
    """
    Testando o erro quando o usuário informa o email errado, mas a senha certa
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id= "",
        email="Abacate@gmail.com",
        password=mock_client_on_db.password
    )
    
    with  pytest.raises(HTTPException) as e:
        uc.login(client_login=client_login)
        
    assert(e.value.status_code) == 400
    assert(e.value.detail) == ERROR_CLIENT_LOGIN_NOT_FOUND_EMAIL


def test_login_success_with_google_id_success_push_token(db_session, mock_client_on_db):
    """
    Realizando Login com Google ID e obtendo sucesso
    """
    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id=mock_client_on_db.google_id,
        email="",
        password="",
        pushToken="0GVzrFKsfAwR591QYHzzBv"
    )

    result = uc.login(client_login=client_login)
    
    decoded_token = decode_token(result.token)
    
    assert type(decoded_token.id) == str
    assert decoded_token.id == mock_client_on_db.id
    assert decoded_token.name == mock_client_on_db.name
    assert decoded_token.level == mock_client_on_db.level
    assert decoded_token.email == mock_client_on_db.email
    assert decoded_token.phone == mock_client_on_db.phone
    assert bool(decoded_token.cpf_cnpj) == bool(mock_client_on_db.cpf_cnpj)

    user = db_session.query(ClientModel).filter_by(id=decoded_token.id).first()
    assert user.pushToken == "0GVzrFKsfAwR591QYHzzBv"


def test_login_success_client_pushToken_in_token(db_session, mock_client_on_db_with_pushToken):

    uc = ClientUseCases(db_session)

    client_login = ClientLogin(
        google_id=mock_client_on_db_with_pushToken.google_id,
    )

    response = uc.login(client_login=client_login)

    decoded_token = decode_token(response.token)

    assert decoded_token.pushToken == mock_client_on_db_with_pushToken.pushToken