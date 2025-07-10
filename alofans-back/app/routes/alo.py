from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException
)
from sqlalchemy.orm import Session


from routes.configs.deps import get_db_session
from routes.docs.alo import (
    ALO_ADD,
    ALO_ADD_RESPONSES,
    ALO_CLIENT,
    ALO_DELETE,
    ALO_DELETE_CLIENT_ALO,
    ALO_DELETE_INTERLOCUTOR_ALO,
    ALO_DELETE_PRODUCER_ALOS,
    ALO_EVENT,
    ALO_GET,
    ALO_GET_INTERLOCUTOR_ALOS,
    ALO_LIST,
    ALO_PRODUCER_INTERLOCUTOR_GET,
    ALO_UPDATE
)
from schemas.alo import (
    AloRequest, 
    AloResponse
)
from schemas.base import BaseMessage
from useCases.alo import AloUseCases
from useCases.client import ClientUseCases


router = APIRouter(prefix='/alo', tags=['Alo'])


@router.post("/add", description=ALO_ADD, status_code=201, responses=ALO_ADD_RESPONSES)
async def add_alo(
    alo_request: AloRequest,
    db_session: Session = Depends(get_db_session)
) -> dict:
    
    uc = AloUseCases(db_session)
    
    response = uc.add_alo(alo_request)
    
    return response


@router.get("/", description=ALO_GET)
async def get_alo(
    alo_id: str,
    db_session: Session = Depends(get_db_session)
) -> AloResponse:
    
    uc = AloUseCases(db_session)
    
    response = uc.get_alo(alo_id)
    
    return response


@router.get("/list", description=ALO_LIST)
async def list_all_alo(
    db_session: Session = Depends(get_db_session)
) -> list[AloResponse]:
    uc = AloUseCases(db_session)
    
    response = uc.list_all_alo()
    
    return response


@router.get("/event", description=ALO_EVENT)
async def list_all_event_alo(
    event_id: str,
    db_session: Session = Depends(get_db_session)
) -> list[AloResponse]:
    
    uc = AloUseCases(db_session)
    
    response = uc.list_all_event_alo(event_id)
    
    return response


@router.put('/update', description=ALO_UPDATE)
async def update_alo(
    alo_id: str,
    status: str,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    uc = AloUseCases(db_session=db_session)
    result = await uc.update_alo(alo_id, status)
    
    return result


@router.delete('/delete', description=ALO_DELETE)
async def delete_alo(
    alo_id: str,
    db_session: Session = Depends(get_db_session)
)-> dict:
    uc = AloUseCases(db_session=db_session)
    result = uc.delete_alo(alo_id)
    return result

@router.get("/client", description=ALO_CLIENT)
async def get_all_alos(
    client_id: str,
    db_session: Session = Depends(get_db_session)
) -> list[AloResponse]:
    
    uc = ClientUseCases(db_session)
    
    result = uc.get_all_alos_from_client(client_id)
    
    return result

@router.delete("/delete-client-alo", description=ALO_DELETE_CLIENT_ALO)
async def delete_alo(
    alo_id: str,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = ClientUseCases(db_session)
    
    result = uc.delete_alo_from_client(alo_id)
    
    return result


@router.get('/producer-interlocutor', description=ALO_PRODUCER_INTERLOCUTOR_GET)
async def get_all_alos_from_producer(
    client_id: str,
    db_session: Session = Depends(get_db_session)
) -> list[AloResponse]:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = []
    
    try:
        result = uc.get_all_alos_from_producer(client_id)
    except:
        pass
    try: # Tenta pegar os alos que ele teve como interlocutor também
        result += uc.get_all_alos_from_interlocutor(client_id)
    except: # caso não consiga, envia apenas de produtor mesmo
        pass
    
    if len(result) == 0:
        raise HTTPException(status_code=404, detail="Nenhum alo encontrado")
    
    
    return result

@router.delete('/delete-producer', description=ALO_DELETE_PRODUCER_ALOS)
async def delete_alo_from_producer(
    alo_id: str,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.delete_alo_from_producer(alo_id)
    
    return result

@router.get('/get-interlocutor-alos', description=ALO_GET_INTERLOCUTOR_ALOS)
async def get_all_alos_from_interlocutor(
    client_id: str,
    db_session: Session = Depends(get_db_session)
) -> list[AloResponse]:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.get_all_alos_from_interlocutor(client_id)
    
    return result

@router.delete('/delete-interlocutor-alo', description=ALO_DELETE_INTERLOCUTOR_ALO)
async def delete_alo_from_interlocutor(
    alo_id: str,
    db_session: Session = Depends(get_db_session)
) -> BaseMessage:
    
    uc = ClientUseCases(db_session=db_session)
    
    result = uc.delete_alo_from_interlocutor(alo_id)
    
    return result