import axios from 'axios';
import { Investor } from '../types';

const API_BASE_URL = 'http://localhost:5000';


export const getInvestors = async (): Promise<Investor[]> => {
  const response = await axios.get<Investor[]>(`${API_BASE_URL}/investors`);
  return response.data;
};

export const getInvestorById = async (id: string): Promise<Investor> => {
  const response = await axios.get<Investor>(`${API_BASE_URL}/investors/${id}`);
  return response.data;
};