import { useState, useEffect } from 'react';
import { Investor } from '../types';
import { getInvestorById } from '../api/investors';

export const useCommitments = (id: string | undefined) => {
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      getInvestorById(id)
        .then((data) => {
          setInvestor(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching investor commitments:', error);
          setError('Failed to load commitments.');
          setIsLoading(false);
        });
    }
  }, [id]);

  return { investor, error, isLoading };
};
