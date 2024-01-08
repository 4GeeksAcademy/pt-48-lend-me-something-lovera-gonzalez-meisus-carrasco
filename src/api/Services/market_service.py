from api.Repositories.market_repository import MarketRepository
from api.Services.HTTP_Status import HTTP_Status



class MarketService:

    @staticmethod
    def get_market_list():
        raw_data = MarketRepository.get_market_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK