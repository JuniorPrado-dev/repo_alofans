from fastapi import (
    APIRouter, 
    Depends
)
from sqlalchemy.orm import Session


from routes.configs.deps import (
    authAccess, 
    get_db_session,
    oauth_access
)
from routes.docs.client import (
    CLIENT_ADD,
    CLIENT_AUTHORIZATION,
    CLIENT_GET,
    CLIENT_GOOGLE_AUTH,
    CLIENT_LIST,
    CLIENT_LOGIN,
    CLIENT_RECOVER_PASSWORD,
    CLIENT_UPDATE,
    CLIENT_DELETE
)
from schemas.tokens import TokenData
from services.tokens import (
    generate_token, 
    encode_token
)
from schemas.client import ClientResponse
from schemas.base import BaseMessage
from schemas.client import (
    ClientRequest, 
    ClientLogin, 
    ClientUpDate
)
from schemas.tokens import TokenResponse
from useCases.client import ClientUseCases


router = APIRouter(prefix='/client', tags=['Client'])


@router.post('/add', description=CLIENT_ADD, status_code=201)
async def add_clients(
    client: ClientRequest,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.add(client)
    
    return result

@router.get('/get', description=CLIENT_GET)
async def get(
    id: str,
    db_session: Session = Depends(get_db_session)
) -> ClientResponse:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.get(id)
    
    return result

@router.get('/list', description=CLIENT_LIST)
async def list_clients(
    db_session: Session = Depends(get_db_session)
) -> list[ClientResponse]:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.get_all()
    
    return result


@router.put('/update', description=CLIENT_UPDATE)
async def update_clients(
    client_id: str,
    user_update: ClientUpDate,
    db_session: Session = Depends(get_db_session)
) -> TokenResponse:
    
    uc = ClientUseCases(db_session=db_session)
    
    uc.update(client_id, user_update)
    
    client = uc.get(client_id)
    
    token = generate_token(client)
    
    return TokenResponse(token=encode_token(token))


@router.delete('/delete', description=CLIENT_DELETE)
async def delete(
    client_id: str,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.delete(client_id)
    
    return result

@router.post('/login', description=CLIENT_LOGIN)
async def login(
    client_login: ClientLogin,
    db_session: Session = Depends(get_db_session)
) -> TokenResponse:
    
    uc = ClientUseCases(db_session)
    
    result = uc.login(client_login)
    
    return result
    

@router.get('/authorization', description=CLIENT_AUTHORIZATION ,dependencies=[Depends(authAccess)])
async def client_authorization(
    db_session: Session = Depends(get_db_session),
    token: str = Depends(oauth_access)
) -> TokenData:
    
    uc = ClientUseCases(db_session)

    result = uc.verify_access_token(token=token)

    return result


@router.get("/google-auth",description=CLIENT_GOOGLE_AUTH)
async def get_google_user_info(
    access_token: str,
    db_session: Session = Depends(get_db_session)
    ) -> dict:
    
    uc = ClientUseCases(db_session=db_session)

    data = await uc.google_auth(access_token=access_token)

    return data


@router.put("/recover-password",description=CLIENT_RECOVER_PASSWORD)
async def recover_password(
    email:str,
    db_session: Session = Depends(get_db_session)
    ) -> BaseMessage:
    
    uc = ClientUseCases(db_session=db_session)

    _ = uc.recover_password(email=email)

    return BaseMessage(detail="E-mail enviado com sucesso")