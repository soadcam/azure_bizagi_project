class User:
    def __init__(self, 
                    email: str,
                    password: str,
                    user_id: int = None):
        self.email = email
        self.password = password
        self.user_id = user_id