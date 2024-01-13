from api.Repositories.user_repository import UserRepository
from api.Services.HTTP_Status import HTTP_Status
class UserService:
    @staticmethod
    def get_list():
        raw_data = UserRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK
    
    @staticmethod
    def get(user_data):
        message = {'message':'User not found'}
        if "id" in user_data:
            raw_data = UserRepository.get_by_id(user_data["id"])
            serialized_data = list(map(lambda element: element.serialize(), raw_data))
            if len(serialized_data) > 0: return serialized_data, HTTP_Status.OK 
        if "email" in user_data:
            raw_data = UserRepository.get_by_email(user_data["email"])
            serialized_data = list(map(lambda element: element.serialize(), raw_data))
            if len(serialized_data) > 0: return serialized_data, HTTP_Status.OK 
        else:
            return message, HTTP_Status.OK
        
    @staticmethod
    def add(user_data):
        result = UserRepository.add(user_data)
        return result, HTTP_Status.OK
    
    @staticmethod
    def update(user_data):
        result = UserRepository.update(user_data)
        return result, HTTP_Status.OK
    
    @staticmethod
    def delete(user_data):
        result = UserRepository.delete(user_data)
        return result, HTTP_Status.OK
