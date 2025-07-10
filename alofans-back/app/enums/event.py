from enum import Enum


class EventType(str, Enum):
    """
    Enumerador com os tipos possíveis para um evento

    - online: Evento online
    - offline: Evento presencial
    """
    online = "ONLINE"
    offline = "PRESENCIAL"