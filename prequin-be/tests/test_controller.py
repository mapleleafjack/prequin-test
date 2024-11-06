import pytest
from unittest.mock import patch
from app import app

class TestController:
    @pytest.fixture
    def client(self):
        app.testing = True
        return app.test_client()

    @patch("app.use_cases.list_investors")
    def test_list_investors_endpoint(self, mock_list_investors, client):
        mock_list_investors.return_value = []
        response = client.get("/investors")
        mock_list_investors.assert_called_once()
        assert response.status_code == 200
        assert response.json == []

    @patch("app.use_cases.get_investor_details")
    def test_get_investor_endpoint(self, mock_get_investor_details, client):
        mock_get_investor_details.return_value = None
        investor_id = "nonexistent_id"
        response = client.get(f"/investors/{investor_id}")
        mock_get_investor_details.assert_called_once_with(investor_id, None)
        assert response.status_code == 404
        assert response.json == {"error": "Investor not found"}
