from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, Integer, String, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from os.path import dirname, abspath
import sys
sys.path.append(dirname(dirname(abspath(__file__))))

from db.base import Base
from db.connection import engine


class Client(Base):
    """
    
    - Attributes: 
        - id: str PK,
        - google_id: str UNIQUE,
        - name: str ,
        - phone: str UNIQUE ,
        - email: str UNIQUE ,
        - password: str 
        - level: str  # ["CLIENT", "INTERLOCUTOR", "PRODUCER"]
        - cpf_cnpj: str,
        - pixkey_type: str 
        - pixkey
        - pushToken: str | None
    

    """
    __tablename__ = 'client'  
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    google_id: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String, unique=True,nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    level: Mapped[str] = mapped_column(String, nullable=False)
    cpf_cnpj: Mapped[str] = mapped_column(String, nullable=True)
    pixkey_type: Mapped[str] = mapped_column(String, nullable=True)
    pixkey: Mapped[str] = mapped_column(String, nullable=True)
    pushToken: Mapped[str] = mapped_column(String, nullable=True)



class Event(Base):
    """
    
    - Atributes
        - id: str
        - name: str
        - description: str
        - date: date
        - alo_cost: float
        - alo_quantity: int
        - is_online: bool
        - link: str | None
        - state: str
        - city: str
        - neighborhood: str | None
        - street: str | None
        - address_number: str | None
        - complement:str  | None
        - image_path: str
        - producer_cpf_cnpj: str
        - interlocutor_cpf_cnpj: str| None
        - interlocutor_pixkeytype: str | None
        - interlocutor_pixkey: str  | None
        - interlocutor_percent: float | None

    """
    
    __tablename__ = 'event'
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    alo_cost: Mapped[float] = mapped_column(Float,nullable=False)
    alo_quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    is_online: Mapped[bool] = mapped_column(Boolean, nullable=False)  # True para eventos online, False para eventos presenciais
    link: Mapped[str] = mapped_column(String,nullable=True)
    state: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=False)
    neighborhood: Mapped[str] = mapped_column(String, nullable=True)
    street: Mapped[str] = mapped_column(String, nullable=True)
    address_number: Mapped[str] = mapped_column(String, nullable=True)
    complement: Mapped[str] = mapped_column(Text, nullable=True)
    image_path: Mapped[str] = mapped_column(String, nullable=False)
    producer_cpf_cnpj: Mapped[str] = mapped_column(String,nullable=False)
    interlocutor_cpf_cnpj: Mapped[str] = mapped_column(String,nullable=True)
    interlocutor_pixkeytype: Mapped[str] = mapped_column(String,nullable=True)
    interlocutor_pixkey: Mapped[str] = mapped_column(String,nullable=True)
    interlocutor_percent: Mapped[float] = mapped_column(Float,nullable=True)
    
    
class Alo(Base):
    """
    - Atributes 
        - id: str PK,
        - text_message: str ,
        - value: float ,
        - created_at: datetime ,
        - status: str , # ["AGUARDANDO", "APROVADO","FINALIZADO","REJEITADO"]
        - client_id: str 
        - event_id: str 
    
    """
    
    __tablename__ = 'alo'  

    id: Mapped[str] = mapped_column(String, primary_key=True)
    text_message: Mapped[str] = mapped_column(Text, nullable=False)
    value: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    status: Mapped[str] = mapped_column(String,nullable=False)
    client_id:Mapped[str] = mapped_column(String, nullable=False)
    event_id:Mapped[str] = mapped_column(String, nullable=False)
    
class Marketing(Base):
    """
    Tabela referente a imagens de marketing e publicidades oferecidas no app
    
    - Attributes
        - id: str PK
        - image_path: str 
        - is_global: bool  # Caso seja falso, deve definir o estado que este anuncio irá aparecer. Caso seja global, ele aparece em todos os estados cadastrados
        - state: str  # Estado onde este anúncio aparecerá
        - city: str # Cidade que será atrelado a este anúncio
        
    """
    
    __tablename__ = "marketing"
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    image_path: Mapped[str] = mapped_column(String, nullable=False)
    is_global: Mapped[bool] = mapped_column(Boolean, nullable=False)
    state: Mapped[str] = mapped_column(String, nullable=True)
    city: Mapped[str] = mapped_column(String, nullable=True)
    
    
######################################  A BAIXO ESTÃO TODAS AS TABELAS DE RELAÇÃO ENTRE AS ENTIDADES ########################################

class AlosFromClient(Base):
    """
    Tabela de relação entre Client e Alos que ele criou
    
    - Attributes
        - id: str PK
        - alo_id: str FK(alo.id) PK
        - client_id: str FK(client.id) PK
        - event_id: str FK(event.id)
    """
    
    __tablename__ = 'alos_from_client'
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    alo_id: Mapped[str] = mapped_column(String, ForeignKey('alo.id', ondelete='CASCADE'))
    client_id: Mapped[str] = mapped_column(String, ForeignKey('client.id', ondelete='CASCADE'))
    event_id: Mapped[str] = mapped_column(String, ForeignKey('event.id', ondelete='CASCADE')) # Precisa disso, pois o alo response retorna o nome do evento, e para conseguir esse dado só com o id do evento
    
class AlosFromProducer(Base):
    """
    Tabela de relação entre Event e Alos que aconteceram naquele evento para que o produtor apresente
    
    - Attributes
        - id: str PK
        - alo_id: str FK(alo.id) PK
        - event_id: str FK(event.id) PK
        - producer_id: str FK(producer.id) PK
    """
    
    __tablename__ = 'alos_from_event'
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    alo_id: Mapped[str] = mapped_column(String, ForeignKey('alo.id', ondelete='CASCADE'))
    event_id: Mapped[str] = mapped_column(String, ForeignKey('event.id', ondelete='CASCADE'))
    producer_id: Mapped[str] = mapped_column(String, ForeignKey('client.id', ondelete='CASCADE'))
    
class AlosFromInterlocutor(Base):
    """
    Tabela de relação entre Interlocutor e Alos que ele validou
    
    - Attributes
        - id: str PK
        - alo_id: str FK(alo.id) PK
        - interlocutor_id: str FK(interlocutor.id) PK
        - event_id: str FK(event.id)
    """
    
    __tablename__ = 'alos_from_interlocutor'
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    alo_id: Mapped[str] = mapped_column(String, ForeignKey('alo.id', ondelete='CASCADE'))
    event_id: Mapped[str] = mapped_column(String, ForeignKey('event.id', ondelete='CASCADE')) # Precisa disso, pois o alo response retorna o nome do evento, e para conseguir esse dado só com o id do evento
    interlocutor_id: Mapped[str] = mapped_column(String, ForeignKey('client.id', ondelete='CASCADE'))
    
class EventsFromProducer(Base):
    """
    Tabela de relação entre Produtor e Eventos que ele criou
    
    - Attributes
        - id: str PK
        - event_id: str FK(event.id) PK
        - producer_id: str FK(producer.id) PK
    """
    
    __tablename__ = 'events_from_producer'
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    event_id: Mapped[str] = mapped_column(String, ForeignKey('event.id', ondelete='CASCADE'))
    producer_id: Mapped[str] = mapped_column(String, ForeignKey('client.id', ondelete='CASCADE'))
    
class EventsFromInterlocutor(Base):
    """
    Tabela de relação entre Interlocutor e Eventos que ele trabalhou
    
    - Attributes
        - id: str PK
        - event_id: str FK(event.id) PK
        - interlocutor_id: str FK(interlocutor.id) PK
    """
    
    __tablename__ = 'events_from_interlocutor'
    
    id: Mapped[str] = mapped_column(String, primary_key=True)
    event_id: Mapped[str] = mapped_column(String, ForeignKey('event.id', ondelete='CASCADE'))
    interlocutor_id: Mapped[str] = mapped_column(String, ForeignKey('client.id', ondelete='CASCADE'))
    

def create_entities() -> bool:
    """
    Cria no banco todas as entidades necessárias para o sistema
    """

    try:
        global engine
        global Base

        print("Starting Database")
        Base.metadata.create_all(engine)
        print("Database created successfully")
        return True

    except Exception as e:

        print(f"Erro ao criar as entidades no banco: {e}")
        return False