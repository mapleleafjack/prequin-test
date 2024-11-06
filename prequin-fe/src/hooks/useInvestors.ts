
import { useState, useEffect } from 'react';
import { Investor } from '../types';
import { getInvestors } from '../api/investors';

export const useInvestors = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getInvestors()
      .then((data) => {
        setInvestors(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching investors:', error);
        setError('Failed to load investors.');
        setIsLoading(false);
      });
  }, []);

  return { investors, error, isLoading };
};