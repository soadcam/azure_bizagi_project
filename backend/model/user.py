class User:
    def __init__(self, 
                    email,
                    password,
                    user_id = None):
        self.email = email
        self.password = password
        self.user_id = user_id