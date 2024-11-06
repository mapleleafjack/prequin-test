class Commitment:
    def __init__(self, id, investor_id, asset_class, amount, currency):
        self.id = id
        self.investor_id = investor_id
        self.asset_class = asset_class
        self.amount = amount
        self.currency = currency

    def to_dict(self):
        return {
            'id': self.id,
            'investor_id': self.investor_id,
            'asset_class': self.asset_class,
            'amount': self.amount,
            'currency': self.currency
        }
