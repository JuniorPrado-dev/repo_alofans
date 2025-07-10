from copy import copy
from datetime import datetime, timedelta
from decouple import config
from fastapi import UploadFile
from fastapi.testclient import TestClient
from io import BytesIO
from pytest import fixture
from PIL import Image


from enums.alo import AloStatus
from enums.openpix import PixKeyType
from enums.user import (
    UserLevel
)
from utils.format import datetime_to_isoformat
from services.image import (
    image_path_on_db, 
    delete_image, 
    upload_image
)
from main import app
from services.ids import id_generate
from schemas.client import (
    ClientRequest, 
    ClientInDB, 
    ClientUpDate
)

from schemas.event import(
    EventRequest,
    EventUpDate,
    EventSearch
)
from schemas.alo import(
    AloRequest,
    AloInDB,
    AloResponse
)
from schemas.marketing import(
    MarketingRequest,
    MarketingResponse
)
from schemas.payment import(
    Customer,
    PaymentRequest,
    PaymentRequestGateway,
    SubAccountRequest,
    Split
)
from services.security.password import protect
from db.models import (
    AlosFromClient,
    AlosFromInterlocutor,
    AlosFromProducer,
    Client as ClientModel,
    Event as EventModel,
    EventsFromProducer,
    EventsFromInterlocutor,
    Alo as AloModel,
    Marketing as MarketingModel,
)
from db.connection import Session

DAYS_TO_CLEAN_EVENT = int(config("DAYS_TO_CLEAN_EVENT"))
VALID_EVENT_DAYS = int(config("VALID_EVENT_DAYS"))

@fixture()
def db_session():
    try:
        session = Session()
        
        session.query(MarketingModel).delete()
        session.query(AloModel).delete()
        session.query(EventModel).delete()
        session.query(ClientModel).delete()
        session.commit()
        
        yield session
    finally:
        
        session.query(MarketingModel).delete()
        session.query(AloModel).delete()
        session.query(EventModel).delete()
        session.query(ClientModel).delete()
        session.commit()
        
        session.close()


###################################################################### CLIENT

@fixture
def mock_ClientRequest() -> ClientRequest:
    return ClientRequest(
        google_id="123456789",
        name="John Doe",
        phone="66666666",
        email="john.doe@example.com",
        password="securepassword123"
    )

@fixture
def mock_ClientUpDate() -> ClientUpDate:
    return ClientUpDate(
        google_id="google_id updated",
        name="John Doe Updated",
        phone="11111111",
        email="john.doe@example.com2 updated",
        password="securepassword1232 updated",
        level=UserLevel.producer.value,
        cpf_cnpj="123.321.132-11",
        pixkey_type=PixKeyType.cpf.value,
        pixkey="123.321.132-11"
    )

@fixture
def mock_list_ClientRequest() -> list[ClientRequest]:
    return [
        ClientRequest(
            google_id="1234567792",
            name="John Doe2",
            phone="33333333",
            email="john.doe@example.com2",
            password="securepassword123"
        ),
        ClientRequest(
            google_id="12345678122",
            name="Mary Doe2",
            phone="44444444",
            email="mary.doe@example.com2",
            password="securepassword1231"
        ),
        ClientRequest(
            google_id="1134567892",
            name="John Lenon2",
            phone="55555555",
            email="john.len@example.com2",
            password="securepassword1232"
        )
    ]


@fixture()
def mock_client_on_db(db_session, mock_ClientRequest):

    client = copy(mock_ClientRequest)
    client.password = protect(client.password)
    
    client_db: ClientInDB = ClientInDB(**client.dict(), id=id_generate(), level=UserLevel.client.value)
    new_client = ClientModel(**client_db.dict())
    
    db_session.add(new_client)
    db_session.commit()
    
    yield new_client
    
@fixture()
def mock_client_on_db_no_google_id(db_session, mock_ClientRequest):

    client = copy(mock_ClientRequest)
    client.password = protect(client.password)
    client.google_id = None
    
    client_db: ClientInDB = ClientInDB(**client.dict(), id=id_generate(), level=UserLevel.client.value)
    new_client = ClientModel(**client_db.dict())
    
    db_session.add(new_client)
    db_session.commit()
    
    yield new_client


@fixture()
def mock_client_list_on_db(db_session, mock_list_ClientRequest):
    clients_db: ClientInDB = [ClientInDB(**client.dict(), id=id_generate(), level=UserLevel.client.value) for client in mock_list_ClientRequest]
    new_clients = [ClientModel(**client.dict()) for client in clients_db]   
    
    db_session.add_all(new_clients)
    db_session.commit()

    yield new_clients

    """
    for client in new_clients:
        db_session.delete(client)
    db_session.commit()
    """
    
@fixture
def mock_interlocutor_on_db(db_session, mock_client_list_on_db):
    client = mock_client_list_on_db[1]
    client.level = UserLevel.interlocutor.value
    client.cpf_cnpj = "123.456.789-66"
    
    db_session.commit()
    db_session.refresh(client)
    yield client
    
@fixture
def mock_producer_on_db(db_session, mock_client_list_on_db):
    client = mock_client_list_on_db[2]
    client.level = UserLevel.producer.value
    client.cpf_cnpj = "123.456.789-77"
    client.pixkey_type = PixKeyType.cpf.value
    client.pixkey = "123.456.789-77"
    
    db_session.commit()
    db_session.refresh(client)
    yield client
    

###################################################################### EVENT
@fixture
def mock_EventRequest(db_session, mock_interlocutor_on_db, mock_producer_on_db):

    yield EventRequest(
        name="Test Event",
        description="This is a test event",
        date="2040-01-01 19:00",
        alo_cost=30.0,
        alo_quantity=10,
        is_online=False,
        link=None,
        state="SP",
        city="São Paulo",
        neighborhood="Jardim Paulistano",
        street="Rua do Sol",
        address_number="Bruxa do 71",
        complement="Casa 1",
        producer_cpf_cnpj=mock_producer_on_db.cpf_cnpj,  # Certifique-se de que este campo está preenchido
        interlocutor_cpf_cnpj=mock_interlocutor_on_db.cpf_cnpj,
        interlocutor_pixkeytype=PixKeyType.cpf.value,
        interlocutor_pixkey= "666.333.000-99",
        interlocutor_percent=0.05
    )
        
"""    db_session.query(MarketingModel).delete()
    db_session.query(AloModel).delete()
    db_session.query(EventModel).delete()
    db_session.query(ProducerModel).delete()
    db_session.query(InterlocutorModel).delete()
    db_session.query(ClientModel).delete()
    db_session.commit()"""


@fixture
def mock_EventUpDate(mock_interlocutor_on_db) -> EventUpDate:
    return EventUpDate(
        name="Updated Test Event",
        description="This is an updated test event",
        date="2040-01-02 15:20",
        alo_cost=15.0,
        alo_quantity=15,
        interlocutor_cpf_cnpj=mock_interlocutor_on_db.cpf_cnpj,
        interlocutor_pixkeytype=PixKeyType.cpf.value,
        interlocutor_pixkey="666.333.000-99",
        interlocutor_percent=0.07
    )

@fixture
def mock_event_on_db(db_session, mock_EventRequest):
    event: EventModel = EventModel(**mock_EventRequest.dict(), id=id_generate(), image_path="image.jpg")
    
    db_session.add(event)
    db_session.commit()
    
    yield event
    """
    db_session.delete(event)
    db_session.commit()
    """
@fixture
def mock_EventSearch():
    return EventSearch(
        name="Test Event",
        description="This is a test event",
        state="SP",
        city="São Paulo",
        type="Online"
    )

@fixture
def mock_AloRequest(mock_client_on_db, mock_event_on_db):
    return AloRequest(
        text_message="Alô Mundo",
        payment_value=50.0,
        client_id=mock_client_on_db.id,
        event_id=mock_event_on_db.id
    )
    
@fixture
def mock_alo_on_db(db_session, mock_AloRequest):
    payload = mock_AloRequest.dict()
    payload.pop('payment_value', None)
    
    alo = AloModel(
        **payload,
        id=id_generate(),
        status=AloStatus.waiting.value,
        created_at=datetime.now(),
        value=mock_AloRequest.payment_value
    )
    
    db_session.add(alo)
    db_session.commit()
    
    yield alo
    
    db_session.delete(alo)
    db_session.commit()

@fixture
def mock_alo_list_on_db(db_session, mock_client_on_db, mock_event_on_db):
    alos = [
        AloModel(
            id=id_generate(),
            text_message="Alô Mundo",
            value=50.0,
            created_at=datetime.now(),
            client_id=mock_client_on_db.id,
            event_id=mock_event_on_db.id,
            status=AloStatus.waiting.value,
        ),
        AloModel(
            id=id_generate(),
            text_message="Alô Mundo",
            value=25.50,
            created_at=datetime.now(),
            client_id=mock_client_on_db.id,
            event_id=mock_event_on_db.id,
            status=AloStatus.finished.value,
        )
    ]
    
    db_session.add_all(alos)
    db_session.commit()
    
    yield alos
    
    for alo in alos:
        db_session.delete(alo)
    db_session.commit()
    

@fixture
def mock_MarketingRequest():
    return MarketingRequest(
        is_global=False,
        state="CE",
        city="Fortaleza"
    )

@fixture
def mock_marketing_on_db(db_session,mock_MarketingRequest, mock_UploadFile) :
    
    new = MarketingRequest(**mock_MarketingRequest.dict())
    
    marketing_id = id_generate()
    
    upload_image("marketing", mock_UploadFile, marketing_id)
    
    marketing = MarketingModel(
        **new.dict(),
        id=marketing_id,
        image_path="image.png"
    )
    
    db_session.add(marketing)
    db_session.commit()
    
    yield marketing
    
    db_session.delete(marketing)
    db_session.commit()
    
    delete_image("marketing",marketing_id)


"""@fixture()
def mock_marketing_image():
    # Simula a leitura da imagem usando OpenCV
    image = cv2.imread("images/marketing/image.png")

    # Verifica se a imagem foi carregada corretamente
    if image is None:
        raise FileNotFoundError("Imagem não encontrada")

    # Codifica a imagem como PNG usando OpenCV
    success, encoded_image = cv2.imencode('.png', image)
    
    if not success:
        raise ValueError("Falha ao codificar a imagem")

    # Cria um buffer de bytes em memória
    image_buffer = BytesIO(encoded_image.tobytes())
    
    # Simule um objeto UploadFile com o buffer e um nome de arquivo
    upload_file = UploadFile(filename="image.png", file=image_buffer)

    # Use yield para que o teste possa utilizar o objeto UploadFile
    yield upload_file

    # Limpeza do buffer após o uso
    image_buffer.close()"""

@fixture()
def mock_UploadFile():
    # Simula a leitura da imagem, substitua por sua função de carregamento
    #image = open_image("images/marketing/image.png")
    image = Image.open("app/tests/test_controllers/test.png")
    # Crie um buffer de bytes em memória
    image_buffer = BytesIO()
    image.save(image_buffer, format="PNG")
    image_buffer.seek(0)

    # Simule um objeto UploadFile com o buffer e um nome de arquivo
    upload_file = UploadFile(filename="image.png", file=image_buffer)
    
    # Use yield para que o teste possa utilizar o objeto UploadFile
    yield upload_file

    # Limpeza do buffer após o uso
    image_buffer.close()


@fixture
def mock_marketing_list_on_db(db_session, mock_UploadFile):
    
    upload_image("marketing",mock_UploadFile, "image")
    
    marketings = [
        MarketingModel(
            id=id_generate(),
            is_global=False,
            state="CE",
            city="Fortaleza",
            image_path=image_path_on_db("marketing","image")
        ),
        MarketingModel(
            id=id_generate(),
            is_global=False,
            state="SP",
            city="São Paulo",
            image_path=image_path_on_db("marketing","image")),
        MarketingModel(
            id=id_generate(),
            is_global=True,
            image_path=image_path_on_db("marketing","image"))
    ]
    
    db_session.add_all(marketings)
    
    yield marketings
    
    for m in marketings:
        db_session.delete(m)
        db_session.commit()
        
    delete_image("marketing", "image")

@fixture
def mock_EventsFromProducer_andEventsFromInterlocutor(db_session, mock_EventRequest):
    
    event = EventModel(**mock_EventRequest.dict(), id=id_generate(), image_path="image.jpg")
    db_session.add(event)
    db_session.commit()
    
    interlocutor = db_session.query(ClientModel).filter_by(cpf_cnpj=event.interlocutor_cpf_cnpj).first()
    
    producer = db_session.query(ClientModel).filter_by(cpf_cnpj=event.producer_cpf_cnpj).first()
    
    efp = EventsFromProducer(
        id=id_generate(),
        event_id=event.id,
        producer_id=producer.id
    )
    efi = EventsFromInterlocutor(
        id=id_generate(),
        event_id=event.id,
        interlocutor_id=interlocutor.id  
    )
    
    db_session.add(efp)
    db_session.add(efi)
    db_session.commit()
    
    return efp, efi

    
@fixture
def mock_AlosFromClient(db_session, mock_alo_on_db):
    
    afc = AlosFromClient(
        id=id_generate(),
        alo_id=mock_alo_on_db.id,
        client_id=mock_alo_on_db.client_id,
        event_id=mock_alo_on_db.event_id
    )
    
    db_session.add(afc)
    db_session.commit()
    
    yield afc
    
    db_session.delete(afc)
    db_session.commit()
    
    
@fixture
def mock_AlosFromInterlocutor(db_session, mock_alo_on_db):
    
    event = db_session.query(EventModel).filter_by(id=mock_alo_on_db.event_id).first()
    interlocutor = db_session.query(ClientModel).filter_by(cpf_cnpj=event.interlocutor_cpf_cnpj).first()
    
    afi = AlosFromInterlocutor(
        id=id_generate(),
        alo_id=mock_alo_on_db.id,
        interlocutor_id=interlocutor.id,
        event_id=mock_alo_on_db.event_id
    )
    
    db_session.add(afi)
    db_session.commit()
    
    return afi
    
@fixture
def mock_AlosFromProducer(db_session, mock_alo_on_db):
    
    event = db_session.query(EventModel).filter_by(id=mock_alo_on_db.event_id).first()
    
    producer = db_session.query(ClientModel).filter_by(cpf_cnpj=event.producer_cpf_cnpj).first()
    
    afi = AlosFromProducer(
        id=id_generate(),
        alo_id=mock_alo_on_db.id,
        producer_id=producer.id,
        event_id=mock_alo_on_db.event_id
    )
    
    db_session.add(afi)
    db_session.commit()
    
    yield afi
    
    db_session.delete(afi)
    db_session.commit()
    
@fixture
def mock_old_event_on_db(db_session, mock_EventRequest):
    event: EventModel = EventModel(**mock_EventRequest.dict(), id=id_generate(), image_path="image.jpg")
    
    event.date = datetime.now() - timedelta(days=VALID_EVENT_DAYS)
    
    db_session.add(event)
    db_session.commit()
    
    yield event
    
    db_session.delete(event)
    db_session.commit()
    

@fixture
def mock_customer(mock_client_on_db) -> Customer:
    customer = Customer(
        name=mock_client_on_db.name,
        email=mock_client_on_db.email
    )

    return customer

@fixture    
def mock_PaymentRequest(db_session,mock_event_on_db, mock_customer, mock_AloRequest) -> PaymentRequest:
    
    producer = db_session.query(ClientModel).filter_by(cpf_cnpj=mock_event_on_db.producer_cpf_cnpj).first()
    
    billing =  PaymentRequest(
        value=50,
        customer=mock_customer,
        producer_cpf_cnpj=mock_event_on_db.producer_cpf_cnpj,
        producer_pixkey=producer.pixkey,
        interlocutor_cpf_cnpj=mock_event_on_db.interlocutor_cpf_cnpj,
        interlocutor_pixkey=mock_event_on_db.interlocutor_pixkey,
        interlocutor_percent=mock_event_on_db.interlocutor_percent,
        alo_data=mock_AloRequest

    )

    return billing

@fixture
def mock_PaymentRequestGateway(db_session,mock_PaymentRequest, mock_event_on_db) -> PaymentRequestGateway:
    
    cents = round(mock_PaymentRequest.value*100,2)
    
    return PaymentRequestGateway(
        correlationID=id_generate(),
        value=int(cents),
        customer=mock_PaymentRequest.customer,
        expiresDate=datetime_to_isoformat(datetime.now() + timedelta(hours=1) + timedelta(hours=3)),
        splits=None
    )

@fixture
def mock_SubAccount(mock_producer_on_db) -> SubAccountRequest:
    return SubAccountRequest(
        name = mock_producer_on_db.cpf_cnpj,
        pixKey= mock_producer_on_db.pixkey,
    )
    
@fixture
def base_url():
    return "http://localhost:5003"


@fixture
def my_app() -> TestClient:
    return TestClient(app)


@fixture
def mock_old_event_on_db_with_no_interlocutor(db_session, mock_producer_on_db):
    event: EventModel = EventModel(
        id=id_generate(),
        name="Old Event On Database",
        description="This is an old event on database",
        date=datetime.now() - timedelta(days=DAYS_TO_CLEAN_EVENT),
        alo_cost=10,
        alo_quantity=20,
        is_online=False,
        city="São Paulo",
        state="SP",
        neighborhood="Vila Mariana",
        street="Rua Paulo Freitas",
        complement="apto 123",
        image_path="image.jpg",
        producer_cpf_cnpj=mock_producer_on_db.cpf_cnpj
    )
    
    db_session.add(event)
    db_session.commit()
    
    yield event
    
    db_session.delete(event)
    db_session.commit()


@fixture
def mock_old_event_on_db_with_interlocutor(db_session,mock_producer_on_db, mock_interlocutor_on_db):
    event: EventModel = EventModel(
        id=id_generate(),
        name="Old Event On Database",
        description="This is an old event on database",
        date=datetime.now() - timedelta(days=DAYS_TO_CLEAN_EVENT),
        alo_cost=10,
        alo_quantity=20,
        is_online=False,
        city="São Paulo",
        state="SP",
        neighborhood="Vila Mariana",
        street="Rua Paulo Freitas",
        complement="apto 123",
        image_path="image.jpg",
        producer_cpf_cnpj=mock_producer_on_db.cpf_cnpj,
        interlocutor_cpf_cnpj=mock_interlocutor_on_db.cpf_cnpj,
        interlocutor_pixkey=mock_interlocutor_on_db.cpf_cnpj,
        interlocutor_pixkeytype="CPF",
        interlocutor_percent=10.0
    )
    
    db_session.add(event)
    db_session.commit()
    
    yield event
    
    db_session.delete(event)
    db_session.commit()

@fixture
def mock_client_on_db_with_pushToken(db_session, mock_ClientRequest):
    client = copy(mock_ClientRequest)
    client.password = protect(client.password)

    client_db: ClientInDB = ClientInDB(**client.dict(), id=id_generate(), level=UserLevel.client.value, pushToken="token123")

    new_client = ClientModel(**client_db.dict())
    db_session.add(new_client)
    db_session.commit()

    return new_client



###################################### DATA
@fixture
def mock_MarketingRequest_data_global():
    data = {}
    data["is_global"] = True
    return data


@fixture
def mock_MarketingRequest_data_local():
    data = {}
    data["is_global"] = False
    data["state"] = "SP"
    data["city"] = "São Paulo"
    return data