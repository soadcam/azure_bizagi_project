from model.customer import Customer

class Credit:
    def __init__(self,
                    property_url_original: str = None,
                    customer: Customer = None,
                    amount_requested: float = None,
                    comments: str = None,
                    property_url_modified: str = None,
                    format_credit_url: str = None,
                    credit_id: int = None):
        self.property_url_original = property_url_original
        self.customer = customer
        self.amount_requested = amount_requested
        self.comments = comments
        self.property_url_modified = property_url_modified
        self.format_credit_url = format_credit_url 
        self.comments = comments
        self.credit_id = credit_id