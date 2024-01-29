from api.Repositories.commodities_repository import CommodityRepository
from api.Services.HTTP_Status import HTTP_Status


class CommodityService:
    @staticmethod
    def get_list():
        raw_data = CommodityRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_key(key):
        raw_data = CommodityRepository.get_by_key(key)
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        if serialized_data == []:
            return {"message": "No Commodity found"}, HTTP_Status.OK
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def add_list(new_Commodity_data):
        operation_result = CommodityRepository.add_list(new_Commodity_data)
        return True, HTTP_Status.OK

    @staticmethod
    def delete():
        result = CommodityRepository.delete()
        return result, HTTP_Status.OK
