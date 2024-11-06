import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Commitments from './Commitments';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Investor } from '../../types';
import '@testing-library/jest-dom';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Commitments Component', () => {
  it('renders commitments list', async () => {
    const mockInvestor: Investor = {
      id: 1,
      name: 'Investor 1',
      type: 'Type A',
      country: 'Country A',
      date_added: '2023-01-01',
      last_updated: '2023-01-02',
      total_commitments: 3000000000,
      commitments: [
        {
          id: 1,
          investor_id: 1,
          asset_class: 'Equity',
          amount: 1000000000,
          currency: 'USD',
        },
        {
          id: 2,
          investor_id: 1,
          asset_class: 'Debt',
          amount: 2000000000,
          currency: 'USD',
        },
      ],
    };

    // Mock the API call
    mockedAxios.get.mockResolvedValue({ data: mockInvestor });

    render(
      <MemoryRouter initialEntries={['/commitments/1']}>
        <Routes>
          <Route path="/commitments/:id" element={<Commitments />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the commitments to be rendered
    await waitFor(() => {
      expect(screen.getByText('Commitments for Investor 1')).toBeInTheDocument();
    });

    // Check that commitments are displayed
    expect(screen.getByText('Equity')).toBeInTheDocument();
    expect(screen.getByText('Debt')).toBeInTheDocument();

    // Check that total commitments are displayed
    expect(screen.getByText('All 3.0B')).toBeInTheDocument();

    // Check filter buttons
    expect(screen.getByText('Equity 1.0B')).toBeInTheDocument();
    expect(screen.getByText('Debt 2.0B')).toBeInTheDocument();

    // Click on a filter button and check the filtered results
    fireEvent.click(screen.getByText('Equity 1.0B'));
    expect(screen.getByText('Equity')).toBeInTheDocument();
    expect(screen.queryByText('Debt')).not.toBeInTheDocument();

    // Ensure the API call was made
    expect(mockedAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/investors/1');
  });
});
