from json import dumps


from constants.event import MESSAGE_EVENT_ADD_SUCCESS, MESSAGE_EVENT_DELETE_SUCCESS, MESSAGE_EVENT_UPDATE_SUCCESS
from schemas.event import EventResponse
from utils.timezone import utc_to_sao_paulo_ymd


def test_event_router_add_success(my_app, mock_EventRequest):
    app = my_app

    # Simule um arquivo de imagem
    image = ("test_image.png", b"fake_image_data", "image/png")

    # Construa o corpo da requisição com os campos obrigatórios
    event_data = mock_EventRequest.dict()
    files = {
        "image": image,
        "event_data": (None, dumps(event_data), "application/json")
    }

    response = app.post("/event/add", files=files)

    assert response.status_code == 201

    data = response.json()

    assert data["detail"] == MESSAGE_EVENT_ADD_SUCCESS


def test_event_router_get_success(my_app, mock_event_on_db):

    app = my_app

    response = app.get("/event/get", params={"event_id": mock_event_on_db.id})

    assert response.status_code == 200

    data = response.json()

    event = EventResponse(**data)

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
    assert event.address_number == mock_event_on_db.address_number
    assert event.complement == mock_event_on_db.complement
    assert event.interlocutor_cpf_cnpj == mock_event_on_db.interlocutor_cpf_cnpj
    assert event.producer_cpf_cnpj == mock_event_on_db.producer_cpf_cnpj
    assert event.interlocutor_pixkey == mock_event_on_db.interlocutor_pixkey
    assert event.interlocutor_percent == mock_event_on_db.interlocutor_percent


def test_event_router_list_success(my_app, mock_event_on_db, mock_old_event_on_db):

    app = my_app

    response = app.get("/event/list")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1

    event = EventResponse(**data[0])

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
    assert event.address_number == mock_event_on_db.address_number
    assert event.complement == mock_event_on_db.complement
    assert event.interlocutor_cpf_cnpj == mock_event_on_db.interlocutor_cpf_cnpj
    assert event.producer_cpf_cnpj == mock_event_on_db.producer_cpf_cnpj
    assert event.interlocutor_pixkey == mock_event_on_db.interlocutor_pixkey
    assert event.interlocutor_percent == mock_event_on_db.interlocutor_percent


def test_event_router_list_all_success(my_app, mock_event_on_db, mock_old_event_on_db):

    app = my_app

    response = app.get("/event/list/all")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 2


def test_event_router_update_success(my_app, mock_event_on_db, mock_EventUpDate):
    
    app = my_app

    

    image = ("test_image.png", b"fake_image_data", "image/png")

    # Construa o corpo da requisição com os campos obrigatórios
    event_data = mock_EventUpDate.dict()
    """
    No contexto do requests ou TestClient do FastAPI, a tupla (None, value) é usada para indicar que value é um campo de formulário regular e não um arquivo.
    """
    files = {
        "event_id": (None, mock_event_on_db.id),
        "image": image,
        "event_update": (None, dumps(event_data), "application/json")
    }

    response = app.put("/event/update", files=files) 

    assert response.status_code == 200

    data = response.json()

    assert data["detail"] == MESSAGE_EVENT_UPDATE_SUCCESS
    


def test_event_router_delete_success(my_app, mock_event_on_db):

    app = my_app

    response = app.delete("/event/delete", params={"event_id": mock_event_on_db.id})

    assert response.status_code == 200

    data = response.json()

    assert data["detail"] == MESSAGE_EVENT_DELETE_SUCCESS