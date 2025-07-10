from enum import Enum


class UserLevel(str, Enum):
    """
    Níveis de acesso dos usuários

    - client: Usuário Cliente
    - interlocutor: Usuário Interlocutor
    - producer: Usuário Produtor
    """
    client = "CLIENTE"
    interlocutor = "INTERLOCUTOR"
    producer = "PRODUTOR"



class UserIdentity(str, Enum):
    cpf = "CPF"
    cnpj = "CNPJ"


