class Investor:
    def __init__(self, id, name, type, country, date_added, last_updated):
        self.id = id
        self.name = name
        self.type = type
        self.country = country
        self.date_added = date_added
        self.last_updated = last_updated
        self.commitments = []

    def add_commitment(self, commitment):
        self.commitments.append(commitment)

    def total_commitments(self):
        return sum(c.amount for c in self.commitments)

    def to_dict(self, include_commitments=True):
        investor_data = {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'country': self.country,
            'date_added': self.date_added,
            'last_updated': self.last_updated,
            'total_commitments': self.total_commitments()
        }
        if include_commitments:
            investor_data['commitments'] = [commitment.to_dict() for commitment in self.commitments]
        return investor_data
