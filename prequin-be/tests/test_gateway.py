import pytest
from src.gateways.investor_gateway import InvestorGateway
from unittest.mock import MagicMock

class TestInvestorGateway:
    @pytest.fixture
    def mock_repository(self):
        return MagicMock()

    @pytest.fixture
    def gateway(self, mock_repository):
        return InvestorGateway(mock_repository)

    def test_get_all_investors(self, gateway, mock_repository):
        mock_repository.get_all_investors.return_value = []
        investors = gateway.get_all_investors()
        mock_repository.get_all_investors.assert_called_once()
        assert investors == []

    def test_get_investor_by_id(self, gateway, mock_repository):
        investor_id = "test_id"
        mock_repository.get_investor_by_id.return_value = None
        investor = gateway.get_investor_by_id(investor_id)
        mock_repository.get_investor_by_id.assert_called_once_with(investor_id)
        assert investor is None
