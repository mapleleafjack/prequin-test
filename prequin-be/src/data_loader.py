import csv
from src.repositories.investor_repository import InvestorRepository
from src.entities.investor import Investor
from src.entities.commitment import Commitment
import uuid

def generate_id():
    return uuid.uuid4().hex

def load_data():
    repository = InvestorRepository(db_path='investors.db')
    with open('data.csv', mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        investor_cache = {}
        for row in csv_reader:
            investor_name = row['Investor Name']
            if investor_name in investor_cache:
                investor_id = investor_cache[investor_name]
            else:
                investor_id = generate_id()
                investor_cache[investor_name] = investor_id
                investor = Investor(
                    id=investor_id,
                    name=investor_name,
                    type=row['Investory Type'],
                    country=row['Investor Country'],
                    date_added=row['Investor Date Added'],
                    last_updated=row['Investor Last Updated']
                )
                repository.add_investor(investor)
            commitment = Commitment(
                id=generate_id(),
                investor_id=investor_id,
                asset_class=row['Commitment Asset Class'],
                amount=float(row['Commitment Amount']),
                currency=row['Commitment Currency']
            )
            repository.add_commitment(commitment)
