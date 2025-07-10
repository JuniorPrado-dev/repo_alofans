from collections import deque
from typing import ClassVar
from pydantic import BaseModel

class Event(BaseModel):
    type: str
    message: str
    
class SSE(BaseModel):
    """
    Server Send Events
    
    - Attributes:
        - EVENTS: deque[Event]: Lista de eventos
    
    - Methods:
        - add_event(event: Event): Adiciona um evento a lista de eventos
        - get_event(): Retorna o primeiro evento da lista de eventos
        - count(): Retorna a quantidade de eventos na lista
    """
    EVENTS: ClassVar[deque] = deque([])
    
    @staticmethod  
    def add_event(event: Event) -> None:
        """
        Adiciona um evento a fila de eventos globalmente
        """
        SSE.EVENTS.append(event)

    @staticmethod        
    def get_event() -> Event | None:
        """
        Pega o primeiro elemento da fila de eventos e o retorna, caso exista
        """
        if SSE.count() > 0:
            return SSE.EVENTS.popleft()
        
        return None
    
    @staticmethod
    def count() -> int:
        """
        Retorna a quantidade de eventos na fila
        
        - Args:
            - None
        
        - Returns:
            - int: Quantidade de eventos na fila
        """
        return len(SSE.EVENTS)