class CreditEvaluation:
    def __init__(self, 
                    credit_id: int,
                    is_approved: bool,
                    comments: str,
                    user_id: int = None):
        self.credit_id = credit_id
        self.is_approved = is_approved
        self.comments = comments
        self.user_id = user_id