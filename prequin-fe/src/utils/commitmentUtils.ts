import { Commitment } from '../types';

// Helper to filter commitments by asset class
export const filterCommitments = (
  commitments: Commitment[],
  assetClassFilter: string
): Commitment[] => {
  if (assetClassFilter === 'All') return commitments;
  return commitments.filter((commitment) => commitment.asset_class === assetClassFilter);
};

// Helper to get unique asset classes for filter buttons
export const getUniqueAssetClasses = (commitments: Commitment[]): string[] => {
  return Array.from(new Set(commitments.map((commitment) => commitment.asset_class)));
};

// Helper to calculate total commitments per asset class
export const calculateTotalByAssetClass = (commitments: Commitment[]): { [key: string]: number } => {
  return commitments.reduce((acc, commitment) => {
    acc[commitment.asset_class] = (acc[commitment.asset_class] || 0) + commitment.amount;
    return acc;
  }, {} as { [key: string]: number });
};
