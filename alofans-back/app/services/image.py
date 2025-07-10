import os
from typing import Literal
from fastapi import UploadFile, HTTPException, status
from fastapi.responses import FileResponse
from os.path import join, exists
from os import remove


def get_path_image(dir:str, file_name:str):
    image_dir = f'/api/app/images/{dir}/{file_name}.jpg'
    return image_dir

def image_path_on_db(dir:Literal["event", "client", "marketing"], file_name: str):
    """
    Gera a URL Correta que deve ser salva no banco de dados, para uma imagem relacionada a um registro
    
    Ex: Imagem referente a um evento, foto de perfil relacionada a um usuário
    
    - Args:
        - dir:: str: Diretório onde a imagem se encontra
        - file_name:: str: Nome do arquivo sem extensão
        
    - Return:
        - link:: str: Link para aquela imagem
    """
    return f"/image?path={get_path_image(dir,file_name)}"

def  upload_image(output: Literal["event", "client", "marketing"], file: UploadFile, master_id: str):
    """
    Salva uma imagem no servidor e retorna seu caminho em caso de sucesso
    
    Args:
        output:: Literal["event", "client"]: Indica se o arquivo é para eventos ou clientes
        file:: UploadFile: Arquivo a ser salvo
        master_id:: str: ID do objeto principal que contem este que o arquivo. (Se for um client, então é o client.id, se for Evento, logo event.id)
    
    Return: 
        str: Caminho do arquivo salvo em caso de sucesso,
    """
    
    #print(file.content_type)
    try:
        print(file.filename)
        if not file.filename.lower().split('.')[-1] in ["jpg", "jpeg", "png"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Formato inválido da imagem")
        #contents = file.read()
        contents = file.file.read() # método .file para leitura síncrona
        
        saved_at = get_path_image(output,master_id)
        with open(saved_at, "wb") as f:
            f.write(contents)
    except:
        raise
    
def get_image_from_URL(image_url: str) -> FileResponse:
    """
    Coleta uma imagem do servidor e a envia no formato FileResponse
    
    - Args:
        - folder:: Literal["event", "client"]: Indica se o arquivo é para eventos, clientes ou marketing
        - master_id:: str: ID do objeto principal que contem este que o arquivo. (Se for um client, então é o client.id, se for Evento, logo event.id)
        
    - Returns:
        - FileResponse:: Imagem Encontrada
    """

    if not exists(image_url):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Imagem não encontrada")
        
    return FileResponse(image_url, media_type='image/jpeg')


def delete_image(folder: Literal["event", "client", "marketing"], master_id: str):
    """
    Coleta uma imagem do servidor e a delete
    
    - Args:
        - folder:: Literal["event", "client"]: Indica se o arquivo é para eventos, clientes ou marketing
        - master_id:: str: ID do objeto principal que contem este que o arquivo. (Se for um client, então é o client.id, se for Evento, logo event.id)
        
    - Returns:
        - None
    """
    
    image_dir = get_path_image(folder, master_id)

    if exists(image_dir):
        
        remove(image_dir)
