import datetime
from model.identity_type import IdentityType

class Customer:
    def __init__(self, 
                    fullname: str,
                    birthdate: datetime,
                    identity_type: IdentityType,
                    identity_number: str,
                    email: str,
                    phone: str,
                    salary: float,
                    customer_id: int = None):
        self.fullname = fullname
        self.birthdate = birthdate
        self.identity_type = identity_type
        self.identity_number = identity_number
        self.email = email
        self.phone = phone
        self.salary = salary      
        self.customer_id = customer_id