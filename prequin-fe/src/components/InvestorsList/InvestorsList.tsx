import React from 'react';
import { Link } from 'react-router-dom';
import { Investor, RequiredInvestorKeys } from '../../types';
import { formatAmount } from '../../utils/format';
import { useInvestors } from '../../hooks/useInvestors';
import { sortItems, SortConfig } from '../../utils/sort';

const InvestorsList: React.FC = () => {
  const { investors, error, isLoading } = useInvestors();
  const [sortConfig, setSortConfig] = React.useState<SortConfig<Investor> | null>(null);

  const sortedInvestors = React.useMemo(() => {
    return sortItems(investors, sortConfig);
  }, [investors, sortConfig]);

  const handleSort = (key: RequiredInvestorKeys) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) {
    return <div>Loading investors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Investors</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>Id</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('type')}>Type</th>
            <th onClick={() => handleSort('date_added')}>Date Added</th>
            <th onClick={() => handleSort('total_commitments')}>Total Commitments</th>
          </tr>
        </thead>
        <tbody>
          {sortedInvestors.map((investor) => (
            <tr key={investor.id}>
              <td>{investor.id}</td>
              <td>{investor.name}</td>
              <td>{investor.type}</td>
              <td>{new Date(investor.date_added).toLocaleDateString()}</td>
              <td>
                <Link to={`/commitments/${investor.id}`}>
                  £{formatAmount(investor.total_commitments)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorsList;
