import pytest
from src.use_cases.investor_use_cases import InvestorUseCases
from src.entities.investor import Investor
from src.entities.commitment import Commitment
from unittest.mock import MagicMock

class TestInvestorUseCases:
    @pytest.fixture
    def mock_gateway(self):
        return MagicMock()

    @pytest.fixture
    def use_cases(self, mock_gateway):
        return InvestorUseCases(mock_gateway)

    def test_list_investors(self, use_cases, mock_gateway):
        mock_gateway.get_all_investors.return_value = []
        investors = use_cases.list_investors()
        mock_gateway.get_all_investors.assert_called_once()
        assert investors == []

    def test_get_investor_details(self, use_cases, mock_gateway):
        # Set up mock data
        investor_id = "test_id"
        mock_investor = Investor(id=investor_id, name="Test Investor", type="Type A", country="Country A", date_added="2023-11-01", last_updated="2023-11-02")
        mock_commitment = Commitment(id="commitment_id", investor_id=investor_id, asset_class="Equity", amount=1000.0, currency="USD")

        # Configure mock returns
        mock_gateway.get_investor_by_id.return_value = mock_investor
        mock_gateway.get_commitments_by_investor.return_value = [mock_commitment]

        # Execute the test
        investor = use_cases.get_investor_details(investor_id)

        # Assertions
        mock_gateway.get_investor_by_id.assert_called_once_with(investor_id)
        mock_gateway.get_commitments_by_investor.assert_called_once_with(investor_id, None)
        assert investor == mock_investor
        assert investor.commitments == [mock_commitment]
