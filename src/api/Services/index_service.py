from api.Repositories.index_repository import IndexRepository
from api.Services.HTTP_Status import HTTP_Status

class IndexService: 
    @staticmethod
    def get_list(): 
        raw_data = IndexRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK
    
    @staticmethod
    def add(index_data):
        result = IndexRepository.add(index_data)
        return result, HTTP_Status.OK
    
    @staticmethod
    def update(index_data):
        result = IndexRepository.update(index_data)
        return result, HTTP_Status.OK
    
    @staticmethod
    def delete(index_data):
        result = IndexRepository.delete(index_data)
        return result, HTTP_Status.OK

