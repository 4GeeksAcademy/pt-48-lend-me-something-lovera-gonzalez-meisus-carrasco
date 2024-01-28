from api.Repositories.crypto_repository import CryptoRepository
from api.Services.HTTP_Status import HTTP_Status


class CryptoService:
    @staticmethod
    def get_list():
        raw_data = CryptoRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_asset_id(asset_id):
        raw_data = CryptoRepository.get_by_asset_id(asset_id)
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        if serialized_data == []:
            return {"message": "No crypto found"}, HTTP_Status.OK
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def add_list(new_Crypto_data):
        operation_result = CryptoRepository.add_list(new_Crypto_data)
        return True, HTTP_Status.OK

    @staticmethod
    def delete():
        result = CryptoRepository.delete()
        return result, HTTP_Status.OK
