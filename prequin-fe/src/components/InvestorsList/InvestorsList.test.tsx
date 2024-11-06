// components/InvestorsList/InvestorsList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import InvestorsList from './InvestorsList';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Investor } from '../../types';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('InvestorsList Component', () => {
  it('renders investors list', async () => {
    const mockInvestors: Investor[] = [
      {
        id: 1,
        name: 'Investor 1',
        type: 'Type A',
        country: 'Country A',
        date_added: '2023-01-01',
        last_updated: '2023-01-02',
        total_commitments: 1000000000,
      },
      {
        id: 2,
        name: 'Investor 2',
        type: 'Type B',
        country: 'Country B',
        date_added: '2023-02-01',
        last_updated: '2023-02-02',
        total_commitments: 2000000000,
      },
    ];

    // Mock the API call
    mockedAxios.get.mockResolvedValue({ data: mockInvestors });

    render(
      <BrowserRouter>
        <InvestorsList />
      </BrowserRouter>
    );

    // Wait for the investors to be rendered
    await waitFor(() => {
      expect(screen.getByText('Investor 1')).toBeInTheDocument();
      expect(screen.getByText('Investor 2')).toBeInTheDocument();
    });

    // Additional assertions
    expect(screen.getByText('Type A')).toBeInTheDocument();
    expect(screen.getByText('Type B')).toBeInTheDocument();

    // Ensure the API call was made
    expect(mockedAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/investors');
  });
});
