from api.Repositories.value_repository import ValueRepository


class ValueService:

    @staticmethod
    def get_list():
        query = ValueRepository.get_list()
        