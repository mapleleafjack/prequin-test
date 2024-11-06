# tests/integration/test_investor_endpoints.py
import pytest
from unittest.mock import patch, MagicMock
from app import app
from src.entities.investor import Investor
from src.entities.commitment import Commitment

@pytest.fixture
def client():
    app.testing = True
    return app.test_client()

@patch("app.use_cases")
class TestInvestorEndpoints:
    def test_list_investors_no_filters(self, mock_use_cases, client):
        mock_investor = Investor(id="test_id", name="Test Investor", type="Type A", country="Country A", date_added="2023-11-01", last_updated="2023-11-02")
        mock_use_cases.list_investors.return_value = [mock_investor]

        # Execute request
        response = client.get("/investors")

        # Assertions
        mock_use_cases.list_investors.assert_called_once()
        assert response.status_code == 200
        assert response.json == [{
            "id": "test_id",
            "name": "Test Investor",
            "type": "Type A",
            "country": "Country A",
            "date_added": "2023-11-01",
            "last_updated": "2023-11-02",
            "total_commitments": 0
        }]

    def test_list_investors_with_filters(self, mock_use_cases, client):
        # Set up mock data
        mock_investor = Investor(id="test_id", name="Test Investor", type="Type A", country="Country A", date_added="2023-11-01", last_updated="2023-11-02")
        mock_investor.total_commitments = MagicMock(return_value=5000.0)
        mock_use_cases.list_investors.return_value = [mock_investor]

        # Execute request with filters
        response = client.get("/investors?min_commitment=1000&max_commitment=6000")

        # Assertions
        mock_use_cases.list_investors.assert_called_once()
        assert response.status_code == 200
        assert response.json == [{
            "id": "test_id",
            "name": "Test Investor",
            "type": "Type A",
            "country": "Country A",
            "date_added": "2023-11-01",
            "last_updated": "2023-11-02",
            "total_commitments": 5000.0
        }]

    def test_get_investor_details(self, mock_use_cases, client):
        # Set up mock data
        investor_id = "test_id"
        mock_investor = Investor(id=investor_id, name="Test Investor", type="Type A", country="Country A", date_added="2023-11-01", last_updated="2023-11-02")
        mock_commitment = Commitment(id="commitment_id", investor_id=investor_id, asset_class="Equity", amount=1000.0, currency="USD")
        mock_investor.commitments = [mock_commitment]

        mock_use_cases.get_investor_details.return_value = mock_investor

        # Execute request
        response = client.get(f"/investors/{investor_id}")

        # Assertions
        mock_use_cases.get_investor_details.assert_called_once_with(investor_id, None)
        assert response.status_code == 200
        assert response.json == {
            "id": investor_id,
            "name": "Test Investor",
            "type": "Type A",
            "country": "Country A",
            "date_added": "2023-11-01",
            "last_updated": "2023-11-02",
            "total_commitments": 1000.0,
            "commitments": [{
                "id": "commitment_id",
                "investor_id": investor_id,
                "asset_class": "Equity",
                "amount": 1000.0,
                "currency": "USD"
            }]
        }
