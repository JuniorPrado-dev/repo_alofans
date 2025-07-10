from datetime import datetime
import pytz


USED_TIMEZONE = 'America/Sao_Paulo'

def get_current_time() -> datetime:
    """
    Obter a data e hora atuais em UTC

    - EX:
      - output: 2024-10-19 15:40:32.615782+00:00

    - Return:
        - datetime: Data e hora atuais em UTC

    """

    return datetime.now(pytz.utc)

def convert_utc_to_timezone(utc_time: datetime, timezone_name: str) -> datetime:
    """
    Converter a data e hora de UTC para um fuso horário específico

    - EX:
        - input: 2024-10-19 15:40:32.615782+00:00, 'America/Sao_Paulo'
        - output: 2024-10-19 12:40:32.615782-03:00

    - Args:
        - utc_time (datetime): Data e hora em UTC
        - timezone_name (str): Nome do fuso horário para converter

    - Return:
        - datetime: Data e hora convertidas para o fuso horário específico

    """

    tz = pytz.timezone(timezone_name)
    return utc_time.astimezone(tz)


def convert_utc_to_sao_paulo_time_zone(utc_time: datetime) -> datetime:
    """
    Converter a data e hora de UTC para o fuso horário de São Paulo

    - EX:
        - input: 2024-10-19T15:40:32.615782+00:00
        - output: 2024-10-19 12:40:32.615782-03:00

    - Args:
        - utc_time (datetime): Data e hora em UTC

    - Return:
        - datetime: Data e hora convertidas para o fuso horário de São Paulo

    """

    return convert_utc_to_timezone(utc_time, 'America/Sao_Paulo')


def convert_timezone_to_brazilian_format(datetime_str: str) -> str:
    """
    Converte uma String Timezone para o formato Brasileiro

    - Ex:
      - input: "2024-10-19T12:33:50.674677-03:00"
      - output: "19-10-2024 12:33"

    - Args:
        - datetime_str (str): String de data e hora

    - Return:
        - str: String de data e hora formatada

    """
    dt = datetime.fromisoformat(datetime_str)
    
    # Formatar a data e hora no formato desejado
    formatted_dt = dt.strftime('%d-%m-%Y %H:%M')
    
    return formatted_dt


def convert_to_utc(datetime_str: str, timezone_str: str) -> str:
    """
    Converte uma String de data e hora para UTC

    - EX:
        - input: "19-10-2024 12:56", "America/Sao_Paulo"
        - output: "2024-10-19T15:56:00+00:00"

    - Args:
        - datetime_str (str): String de data e hora
        - timezone_str (str): Nome do fuso horário
    
    - Return:
        - str: String de data e hora convertida para UTC
    """
    local_tz = pytz.timezone(timezone_str)
    local_dt = local_tz.localize(datetime.strptime(datetime_str, '%Y-%m-%d %H:%M'))
    
    # Converter para UTC
    utc_dt = local_dt.astimezone(pytz.utc)
    
    return utc_dt.isoformat()


def convert_utc_to_sao_paulo_time_zone(utc_time: datetime) -> str:
    """
    Converter a data e hora de UTC para o fuso horário de São Paulo

    - EX:
        - input: 2024-10-19T15:40:32.615782+00:00
        - output: 19-10-2024 12:40

    - Args:
        - utc_time (datetime): Data e hora em UTC

    - Return:
        - str: Data e hora convertidas para o fuso horário de São Paulo

    """

    sao_paulo_tz = pytz.timezone('America/Sao_Paulo')
    sao_paulo_dt = utc_time.astimezone(sao_paulo_tz)
    sao_paulo_str = sao_paulo_dt.isoformat()
    
    return convert_timezone_to_brazilian_format(sao_paulo_str)


def convert_sao_paulo_to_utc(sao_paulo_time: str) -> str:
    """
    Converter a data e hora de São Paulo para UTC

    - EX:
      - input = 19-10-2024 12:56
      - output = 2024-10-19T15:56:00+00:00

    - Args:
        - sao_paulo_time (str): Data e hora em São Paulo

    - Return:
        - str: Data e hora convertidas para UTC

    """

    dt = datetime.strptime(sao_paulo_time, '%d-%m-%Y %H:%M').strftime('%Y-%m-%d %H:%M')
    sao_paulo_tz = pytz.timezone('America/Sao_Paulo')
    sao_paulo_dt = datetime.fromisoformat(dt)
    sao_paulo_dt = sao_paulo_tz.localize(sao_paulo_dt)
    
    utc_dt = sao_paulo_dt.astimezone(pytz.utc)
    utc_str = utc_dt.isoformat()
    
    return utc_str


def sao_paulo_ymd_to_utc(date: str) -> str:
    """
    Converter uma String de data e hora no formato americano para UTC

    - EX:
      - input: "2024-10-19 12:56"
      - output: "2024-10-19T15:56:00+00:00"

    - Args:
        - date (str): String de data e hora no formato americano

    - Return:
        - str: String de data e hora convertida para UTC

    """
    if isinstance(date,datetime):
        date = date.strftime('%Y-%m-%d %H:%M')
    sao_paulo_tz = pytz.timezone('America/Sao_Paulo')
    local_dt = datetime.strptime(date, '%Y-%m-%d %H:%M')
    local_dt = sao_paulo_tz.localize(local_dt)
    utc_dt = local_dt.astimezone(pytz.utc)
    return utc_dt.strftime('%Y-%m-%d %H:%M')
    #return utc_dt.isoformat()

def utc_to_sao_paulo_ymd(utc_datetime: datetime) -> str:
    """
    Converter uma String de data e hora em UTC para o formato americano

    - EX:
      - input: "2024-10-19T15:56:00+00:00"
      - output: "2024-10-19 12:56"

    - Args:
        - utc_datetime (datetime): data e hora em UTC

    - Return:
        - str: String de data e hora convertida para o formato americano

    """
    dt = utc_datetime
    #dt = datetime.fromisoformat(utc_datetime)
    sao_paulo_tz = pytz.timezone('America/Sao_Paulo')
    sao_paulo_dt = dt.astimezone(sao_paulo_tz)
    
    return sao_paulo_dt.strftime('%Y-%m-%d %H:%M')

