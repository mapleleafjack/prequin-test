import sqlite3
from src.entities.investor import Investor
from src.entities.commitment import Commitment

class InvestorRepository:
    def __init__(self, db_path='investors.db'):
        self.db_path = db_path
        self._create_tables()

    def _connect(self):
        return sqlite3.connect(self.db_path)

    def _create_tables(self):
        with self._connect() as conn:
            with open('schema.sql', 'r') as schema_file:
                conn.executescript(schema_file.read())

    def add_investor(self, investor):
        query = '''
            INSERT OR IGNORE INTO investors (id, name, type, country, date_added, last_updated)
            VALUES (?, ?, ?, ?, ?, ?)
        '''
        self._execute_query(query, investor.id, investor.name, investor.type, investor.country, investor.date_added, investor.last_updated)

    def add_commitment(self, commitment):
        query = '''
            INSERT INTO commitments (id, investor_id, asset_class, amount, currency)
            VALUES (?, ?, ?, ?, ?)
        '''
        try:
            self._execute_query(query, commitment.id, commitment.investor_id, commitment.asset_class, commitment.amount, commitment.currency)
        except sqlite3.IntegrityError:
            pass  # Duplicate commitment

    def get_all_investors(self):
        query = 'SELECT * FROM investors'
        rows = self._fetch_all(query)
        return [self._build_investor(row) for row in rows]

    def get_investor_by_id(self, investor_id):
        query = 'SELECT * FROM investors WHERE id = ?'
        row = self._fetch_one(query, investor_id)
        return self._build_investor(row) if row else None

    def get_commitments_by_investor(self, investor_id, asset_class=None):
        query = 'SELECT * FROM commitments WHERE investor_id = ?'
        params = (investor_id,)
        if asset_class:
            query += ' AND asset_class = ?'
            params += (asset_class,)
        rows = self._fetch_all(query, *params)
        return [Commitment(*row) for row in rows]

    def has_data(self):
        query = 'SELECT COUNT(*) FROM investors'
        count = self._fetch_one(query)[0]
        return count > 0

    def _execute_query(self, query, *params):
        with self._connect() as conn:
            conn.execute(query, params)
            conn.commit()

    def _fetch_all(self, query, *params):
        with self._connect() as conn:
            return conn.execute(query, params).fetchall()

    def _fetch_one(self, query, *params):
        with self._connect() as conn:
            return conn.execute(query, params).fetchone()

    def _build_investor(self, row):
        investor = Investor(*row)
        investor.commitments = self.get_commitments_by_investor(investor.id)
        return investor
