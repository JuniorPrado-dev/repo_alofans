from typing import get_type_hints
from pydantic import BaseModel

class CustomBaseModel(BaseModel):
    def dict(self, exclude: list = [],*args, **kwargs):
        d = super().model_dump(*args, **kwargs)
        d = {k: v for k, v in d.items() if v is not None and k not in exclude}
        return d
    
    @classmethod
    def attributes(cls) -> str:
        # Obtendo os hints de tipo para a classe
        tipo_hints = get_type_hints(cls)
        
        # Formatando a string com o tipo de cada atributo
        atributos_formatados = [f"{nome}:{tipo.__name__}" for nome, tipo in tipo_hints.items()]
        
        # Unindo os atributos formatados em uma string separada por vírgulas
        return ", ".join(atributos_formatados)


class BaseMessage(CustomBaseModel):
    """
    - detail: str
    """
    detail: str
