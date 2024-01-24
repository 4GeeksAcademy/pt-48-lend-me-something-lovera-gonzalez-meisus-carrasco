from api.Repositories.portfolio_repository import PortfolioRepository
from api.Services.HTTP_Status import HTTP_Status
import re


class PortfolioService:
    @staticmethod
    def get_list():
        raw_data = PortfolioRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_id(id):
        raw_data = PortfolioRepository.get_by_id(id)
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        if serialized_data == []:
            return {"message": "No user found"}, HTTP_Status.BAD_REQUEST
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def add(item_data):
        result = PortfolioRepository.add(item_data)
        return result, HTTP_Status.OK

    @staticmethod
    def update(item_data):
        result = PortfolioRepository.update(item_data)
        return result, HTTP_Status.OK

    @staticmethod
    def delete(item_data):
        result = PortfolioRepository.delete(item_data)
        return result, HTTP_Status.OK
