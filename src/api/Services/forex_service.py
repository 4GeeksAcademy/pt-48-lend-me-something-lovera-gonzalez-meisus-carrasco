from api.Repositories.forex_repository import ForexRepository 
from api.Services.HTTP_Status import HTTP_Status


class ForexService:
    @staticmethod
    def get_list():
        raw_data = ForexRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_ticker(ticker):
        raw_data = ForexRepository.get_by_ticker(ticker)
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        if serialized_data == [] : return {'message': 'No forex found'}, HTTP_Status.OK
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def add_list(new_forex_data):
        operation_result = ForexRepository.add_list(new_forex_data)
        return True, HTTP_Status.OK
    
    
    @staticmethod
    def delete():
        result = ForexRepository.delete()
        return result, HTTP_Status.OK
