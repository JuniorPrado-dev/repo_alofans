from constants.alo import (
    ERROR_ALO_REQUIRED_FIELD_CLIENT_ID,
    ERROR_ALO_REQUIRED_FIELD_EVENT_ID,
    ERROR_ALO_REQUIRED_FIELD_PAYMENT_VALUE,
    ERROR_ALO_REQUIRED_FIELD_TEXT_MESSAGE,
    ERROR_ALOS_OUT_OF_STOCK,
    ERROR_CLIENT_NOT_FOUND,
    MESSAGE_ALO_ADD_SUCCESS
)
from constants.event import ERROR_EVENT_NOT_FOUND
from utils.messages.docs import (
    generate_response,
    generate_responses_documentation
)


ALO_ADD = "Cadastra um novo Alô no banco de Dados"
ALO_GET = "Busca um alô no banco de dados através de seu ID"
ALO_LIST = "Busca todos os alôs salvos no banco de dados"
ALO_EVENT = "Lista todos os alôs salvos no banco de dados que pertencem a um evento específico"
ALO_UPDATE = "Atualiza o status de um alô salvo no banco de dados"
ALO_DELETE = "Deleta um alô no banco de dados através de seu ID"
ALO_CLIENT = "Busca todos os alôs salvos no banco de dados que pertencem a um cliente específico através do ID do Cliente"
ALO_DELETE_CLIENT_ALO = "Deleta um alô do histórico do cliente, sem o remover definitivamente do banco de dados."
ALO_PRODUCER_INTERLOCUTOR_GET = "Busca todos os alôs salvos no banco de dados que pertencem a um produtor ou interlocutor específico através do ID de Cliente"
ALO_DELETE_PRODUCER_ALOS = "Deleta todos um salvos no banco de dados que está no histórico a um produtor específico através do ID do alô"
ALO_GET_INTERLOCUTOR_ALOS = "Busca todos os alôs salvos no banco de dados que pertencem a um interlocutor específico através do ID do Cliente"
ALO_DELETE_INTERLOCUTOR_ALO = "Deleta um alô do histórico do interlocutor, sem o remover definitivamente do banco de dados."



ALO_ADD_RESPONSES = generate_responses_documentation(
    [
        generate_response(201, MESSAGE_ALO_ADD_SUCCESS),
        generate_response(422, ERROR_ALO_REQUIRED_FIELD_TEXT_MESSAGE),
        generate_response(422, ERROR_ALO_REQUIRED_FIELD_PAYMENT_VALUE),
        generate_response(422, ERROR_ALO_REQUIRED_FIELD_CLIENT_ID),
        generate_response(422, ERROR_ALO_REQUIRED_FIELD_EVENT_ID),
        generate_response(404, ERROR_CLIENT_NOT_FOUND),
        generate_response(404, ERROR_EVENT_NOT_FOUND),
        generate_response(404, ERROR_ALOS_OUT_OF_STOCK)
    ]
)