from api.Repositories.index_repository import IndexRepository
from api.Services.HTTP_Status import HTTP_Status

class IndexService: 
    @staticmethod
    def get_list(): 
        raw_data = IndexRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK
