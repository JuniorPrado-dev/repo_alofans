from enum import Enum

class PixKeyType(str,Enum):
    cpf = "CPF"
    cnpj = "CNPJ"
    email = "EMAIL"
    phone = "PHONE"
    random = "RANDOM"
    telefone = "TELEFONE"
    