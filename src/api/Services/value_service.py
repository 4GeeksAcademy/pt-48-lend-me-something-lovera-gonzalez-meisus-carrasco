from api.Repositories.value_repository import ValueRepository
from api.Services.HTTP_Status import HTTP_Status

class ValueService:

    @staticmethod
    def get_list():
        raw_data = ValueRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK
