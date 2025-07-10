from schemas.event import EventRequest, EventUpDate

def test_EventRequest_online():
    event = EventRequest(
        name="Event",
        description="Description",
        date="2022-01-01",
        alo_cost=10.0,
        alo_quantity=10,
        is_online=True,
        link="link",
        state="State",
        city="City",
        producer_cpf_cnpj="123.456.789-00",
        interlocutor_cpf_cnpj="321.245.458-20",
        interlocutor_pixkey="321.245.458-20",
        interlocutor_percent=0.05,
    )
    assert event.name == "Event"
    assert event.description == "Description"
    assert event.date == "2022-01-01"
    assert event.alo_cost == 10.0
    assert event.alo_quantity == 10
    assert event.is_online is True
    assert event.link == "link"
    assert event.state == "State"
    assert event.city == "City"
    assert event.producer_cpf_cnpj == "123.456.789-00"
    assert event.interlocutor_cpf_cnpj == "321.245.458-20"
    assert event.interlocutor_pixkey == "321.245.458-20"
    assert event.interlocutor_percent == 0.05
    
def test_EventRequest_offline():
    event = EventRequest(
        name="Event",
        description="Description",
        date="2022-01-01",
        alo_cost=10.0,
        alo_quantity=10,
        is_online=False,
        state="State",
        city="City",
        neighborhood="Neighborhood",
        street="Street",
        address_number="123",
        complement="Complement",
        producer_cpf_cnpj="123.123.123-12",
        interlocutor_cpf_cnpj="123.123.123-12",
        interlocutor_pixkey="123.123.123-12",
        interlocutor_percent=1,
    )
    assert event.name == "Event"
    assert event.description == "Description"
    assert event.date == "2022-01-01"
    assert event.alo_cost == 10.0
    assert event.alo_quantity == 10
    assert event.is_online is False
    assert event.state == "State"
    assert event.city == "City"
    assert event.producer_cpf_cnpj == "123.123.123-12"
    assert event.interlocutor_cpf_cnpj == "123.123.123-12"
    assert event.interlocutor_pixkey == "123.123.123-12"
    assert event.interlocutor_percent == 1

def test_EventUpDate():
    event_update = EventUpDate(
        name="Updated Event",
        description="Updated Description",
        date="2022-02-01",
        alo_cost=20.0,
        alo_quantity=20,
        interlocutor_cpf_cnpj="123.456.789-00",
        interlocutor_pixkeytype="CNPJ",
        interlocutor_pixkey="123.456.789-00",
    )
    
    assert event_update.name == "Updated Event"
    assert event_update.description == "Updated Description"
    assert event_update.date == "2022-02-01"
    assert event_update.alo_cost == 20.0
    assert event_update.alo_quantity == 20
    assert event_update.interlocutor_cpf_cnpj == "123.456.789-00"
    assert event_update.interlocutor_pixkeytype=="CNPJ"
    assert event_update.interlocutor_pixkey == "123.456.789-00"