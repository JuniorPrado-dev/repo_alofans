from datetime import datetime
from fastapi import HTTPException
from re import (
    match, 
    sub
)
import pytz


from constants.person import ERROR_CLIENT_INVALID_EMAIL
from enums.openpix import PixKeyType

#from schemas.event import EventResponse

def date_to_str(date:datetime) -> str:
    """
    Converte uma data para uma String no seguinte formato Ano-Mes-Dia Hora:Minuto
    """
    return date.strftime('%Y-%m-%d %H:%M')

def str_to_date(string: str, utc = False) -> datetime:
    """
    Converte uma String para uma data
    
    - Args:
        - string:: str: String que será convertida para data
        
    - Returns:
        - datetime: Data convertida
    """
    if utc:
        return datetime.strptime(string, '%Y-%m-%d %H:%M').replace(tzinfo=pytz.utc)

    return datetime.strptime(string, '%Y-%m-%d %H:%M')


def datetime_to_isoformat(date: datetime | str) -> str:
    
    if isinstance(date, datetime):
        return date.isoformat()
    
    if isinstance(date, str):
        return datetime.strptime(date, "%Y-%m-%d %H:%M").isoformat()
    
    raise ValueError("Data inválida. Informe uma data no formato 'YYYY-MM-DD HH:MM'")

def validate_cpf_cnpj(string:str) -> dict[str, str]:
    """
    Valida um CPF ou CNPJ
    
    - Args:
        - string:: str: String que será validada para ser, CPF ou CNPJ
        
    - Return:
        - dict[str, str]: Dicionário com a informação sobre o tipo de identidade (CPF ou CNPJ) e o número da identidade
            - chaves: 
                - identity, 
                - number
        - HTTPException: Caso o tamanho da string seja inválido para ser um CPF ou CNPJ
    
    """
    identity = "".join([number for number in string if number.isnumeric()])
    
    if len(identity) == 11: #Caso seja um CPF
        return {"identity": "CPF", "number": identity}
    
    elif len(identity) == 14:
        return {"identity": "CNPJ", "number": identity}
    
    raise HTTPException(422,"CPF/CNPJ invalido")

def validate_email(email:str) -> None:
    """
    Valida um email
    
    - Args:
        - email:: str: Email que será validado
        
    - Return:
        - None
    
    - Raises:    
        - HTTPException: 422 - E-mail invalido
    
    """
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not match(email_regex, email):
        raise HTTPException(422, ERROR_CLIENT_INVALID_EMAIL)
    
def validate_phone_number(phone_number: str) -> str:
    """
    Remove todos os caracteres especiais de um número de telefone e valida o formato.
    
    - Args:
        - phone_number: str: Número de telefone que será limpo e validado
        
    - Return:
        - str: Número de telefone contendo apenas dígitos e no formato correto
    
    - Raises:    
        - HTTPException: 422 - Número de telefone inválido
    """
    
    # Removendo todos os caracteres que não são dígitos
    cleaned_number = sub(r'\D', '', phone_number)
    
    # Definindo o formato esperado de número de telefone brasileiro com DDD e dígito 9
    phone_regex = r'^\d{2}9\d{8}$'
    
    # Verificando se o número de telefone limpo corresponde ao formato esperado
    if not match(phone_regex, cleaned_number):
        raise HTTPException(422, 'Número de telefone inválido. Deve conter 11 dígitos no formato correto (XX9XXXXXXXX)')
    
    return cleaned_number

def validate_house_number(house_number: str) -> str:
    """
    Valida o número da casa levando em conta as seguintes possibilidades
    - Números Inteiros: Exemplo: 123
    - Números com Letras: Exemplo: 123A, 123B
    - Números com Barras: Exemplo: 123/1, 123/2
    - Números com Hífen: Exemplo: 123-1, 123-2
    - Casos Especiais: Como "S/N" (sem número)
    
    - Args:
        - house_number: str: Número da casa que será validado
        
    - Return:
        - str: Número da casa validado
    
    - Raises:    
        - HTTPException: 422 - Número da casa inválido
    """
    
    # Definindo o formato esperado de número de casa
    house_number_regex = r'^\d+[A-Za-z]?(/?\d+)?(-?\d+)?$|^S/N$'
    
    # Verificando se o número da casa fornecido corresponde ao formato esperado
    if not match(house_number_regex, house_number):
        raise HTTPException(422, 'Número da casa inválido. Deve ser um número válido ou (S/N)')
    
    return house_number


def get_pix_key_type(pix_key: str):
    """
    Retorna o tipo de chave PIX
    
    - Args:
        - pix_key:: str: Chave PIX que será verificada
        
    - Returns:
        - str: Tipo de chave PIX
    """
    if len(pix_key) == 11:
        return PixKeyType.cpf.value
    if len(pix_key) == 14:
        return PixKeyType.cnpj.value
    if len(pix_key) == 15:
        return PixKeyType.phone.value
    if "@" in pix_key:
        return PixKeyType.email.value
    return PixKeyType.random.value

def format_piKey_to_openpix_format(pixkey:str, pix_key_type: str) -> str:
    """
    Formata uma chave PIX para o padrão Open PIX
    
    - Args:
        - pixkey:: str: Chave PIX que será formatada
        
    - Returns:
        - str: Chave PIX formatada no padrão Open PIX
    """
    pix_key_type = pix_key_type.upper()
    if pix_key_type not in PixKeyType.__dict__.values():
        raise HTTPException(409,f"Tipo de chave PIX inválido, deve estar em: {PixKeyType.__dict__.values()}")

    is_phone = False
    if pix_key_type == PixKeyType.phone.value:
        is_phone = True

    string = pixkey.replace('.', '').replace('-','').replace(' ','')
    if is_phone:
        string = "+55"+string
    return string