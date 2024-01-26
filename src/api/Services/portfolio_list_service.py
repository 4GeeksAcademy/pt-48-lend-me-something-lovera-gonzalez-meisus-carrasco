from api.Repositories.portfolio_list_repository import PortfolioListRepository
from api.Services.HTTP_Status import HTTP_Status
import re


class PortfolioListService:
    @staticmethod
    def get_list():
        raw_data = PortfolioListRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_id(id):
        raw_data = PortfolioListRepository.get_by_id(id)
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        if serialized_data == []:
            return {"message": "No user found"}, HTTP_Status.OK
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_portfolio_id(id):
        raw_data = PortfolioListRepository.get_by_portfolio_id(id)
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        if serialized_data == []:
            return [], HTTP_Status.OK
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def add(item_data):
        result = PortfolioListRepository.add(item_data)
        return result, HTTP_Status.OK


    @staticmethod
    def delete(item_data):
        result = PortfolioListRepository.delete(item_data)
        return result, HTTP_Status.OK
