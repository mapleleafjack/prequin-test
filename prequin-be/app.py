from flask import Flask, jsonify, request
from src.data_loader import load_data
from src.gateways.investor_gateway import InvestorGateway
from src.use_cases.investor_use_cases import InvestorUseCases
from src.repositories.investor_repository import InvestorRepository
import os

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load data on startup only if the database is empty
def is_database_empty():
    repository = InvestorRepository(db_path='investors.db')
    return not repository.has_data()

if not os.path.exists('investors.db') or is_database_empty():
    load_data()

# Initialize gateway and use cases
repository = InvestorRepository(db_path='investors.db')
gateway = InvestorGateway(repository)
use_cases = InvestorUseCases(gateway)

@app.route('/investors', methods=['GET'])
def list_investors():
    asset_class = request.args.get('asset_class')
    min_commitment = request.args.get('min_commitment', type=float)
    max_commitment = request.args.get('max_commitment', type=float)
    
    investors = use_cases.list_investors()

    # Apply filters on the investors list
    if asset_class:
        investors = [
            investor for investor in investors
            if any(commitment.asset_class == asset_class for commitment in investor.commitments)
        ]
    if min_commitment is not None:
        investors = [investor for investor in investors if investor.total_commitments() >= min_commitment]
    if max_commitment is not None:
        investors = [investor for investor in investors if investor.total_commitments() <= max_commitment]

    return jsonify([investor.to_dict(include_commitments=False) for investor in investors])

@app.route('/investors/<string:investor_id>', methods=['GET'])
def get_investor(investor_id):
    asset_class = request.args.get('asset_class')
    investor = use_cases.get_investor_details(investor_id, asset_class)

    if investor is None:
        return jsonify({'error': 'Investor not found'}), 404

    # Optional: Filter commitments by asset class if specified
    if asset_class:
        investor.commitments = [
            commitment for commitment in investor.commitments if commitment.asset_class == asset_class
        ]

    return jsonify(investor.to_dict(include_commitments=True))

if __name__ == '__main__':
    app.run(debug=True)
