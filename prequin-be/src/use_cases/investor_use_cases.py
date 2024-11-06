class InvestorUseCases:
    def __init__(self, investor_gateway):
        self.investor_gateway = investor_gateway

    def list_investors(self):
        return self.investor_gateway.get_all_investors()

    def get_investor_details(self, investor_id, asset_class=None):
        investor = self.investor_gateway.get_investor_by_id(investor_id)
        commitments = self.investor_gateway.get_commitments_by_investor(investor_id, asset_class)
        investor.commitments = commitments
        return investor
