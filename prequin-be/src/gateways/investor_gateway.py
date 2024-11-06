class InvestorGateway:
    def __init__(self, repository):
        self.repository = repository

    def get_all_investors(self):
        return self.repository.get_all_investors()

    def get_investor_by_id(self, investor_id):
        return self.repository.get_investor_by_id(investor_id)

    def get_commitments_by_investor(self, investor_id, asset_class=None):
        return self.repository.get_commitments_by_investor(investor_id, asset_class)
