from constants.person import (
    MESSAGE_CLIENT_ADD_SUCCESS
)
from schemas.client import(
    ClientResponse
)


def test_client_router_add_success(my_app, mock_ClientRequest):

    app = my_app

    response = app.post("/client/add", json=mock_ClientRequest.dict())

    assert response.status_code == 201

    data = response.json()

    assert data["detail"] == MESSAGE_CLIENT_ADD_SUCCESS


def test_client_router_get_success(my_app, mock_client_on_db):

    app = my_app

    response = app.get("/client/get", params={"id": mock_client_on_db.id})

    assert response.status_code == 200

    data = response.json()

    client = ClientResponse(**data)

    assert client.id == mock_client_on_db.id
    assert client.name == mock_client_on_db.name
    assert client.phone == mock_client_on_db.phone
    assert client.email == mock_client_on_db.email
    assert client.level == mock_client_on_db.level


def test_client_router_list_success(my_app, mock_client_on_db):

    app = my_app

    response = app.get("/client/list")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1

    client = ClientResponse(**data[0])

    assert client.id == mock_client_on_db.id
    assert client.name == mock_client_on_db.name
    assert client.phone == mock_client_on_db.phone
    assert client.email == mock_client_on_db.email
    assert client.level == mock_client_on_db.level


def test_client_router_update_success(my_app, mock_ClientUpDate, mock_client_on_db):

    app = my_app

    response = app.put("/client/update", params={"client_id": mock_client_on_db.id}, json=mock_ClientUpDate.dict())

    assert response.status_code == 200
    assert response.json()["token"] is not None