import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Commitment } from '../../types';
import { useCommitments } from '../../hooks/useCommitments';
import { formatAmount } from '../../utils/format';
import { filterCommitments, getUniqueAssetClasses, calculateTotalByAssetClass } from '../../utils/commitmentUtils';
import { sortItems, SortConfig } from '../../utils/sort';

const Commitments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { investor, error, isLoading } = useCommitments(id);
  const [assetClassFilter, setAssetClassFilter] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<SortConfig<Commitment> | null>(null);

  const commitments = investor?.commitments || [];

  // Memoized values for filtered and sorted commitments
  const filteredCommitments = useMemo(() => {
    return sortItems(filterCommitments(commitments, assetClassFilter), sortConfig);
  }, [commitments, assetClassFilter, sortConfig]);

  // Memoized asset classes and total commitments by asset class
  const assetClasses = useMemo(() => getUniqueAssetClasses(commitments), [commitments]);
  const totalCommitmentsByAssetClass = useMemo(() => calculateTotalByAssetClass(commitments), [commitments]);

  const handleSort = (key: keyof Commitment) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) return <div>Loading commitments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Commitments for {investor?.name}</h1>

      {/* Asset Class Filters */}
      <div className="filter-buttons">
        <button
          onClick={() => setAssetClassFilter('All')}
          className={assetClassFilter === 'All' ? 'active' : ''}
        >
          All {formatAmount(investor?.total_commitments || 0)}
        </button>
        {assetClasses.map((assetClass) => (
          <button
            key={assetClass}
            onClick={() => setAssetClassFilter(assetClass)}
            className={assetClassFilter === assetClass ? 'active' : ''}
          >
            {assetClass} {formatAmount(totalCommitmentsByAssetClass[assetClass] || 0)}
          </button>
        ))}
      </div>

      {/* Commitments Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>Id</th>
            <th onClick={() => handleSort('asset_class')}>Asset Class</th>
            <th onClick={() => handleSort('currency')}>Currency</th>
            <th onClick={() => handleSort('amount')}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCommitments.map((commitment) => (
            <tr key={commitment.id}>
              <td>{commitment.id}</td>
              <td>{commitment.asset_class}</td>
              <td>{commitment.currency}</td>
              <td>{formatAmount(commitment.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Commitments;
