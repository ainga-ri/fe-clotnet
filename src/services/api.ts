import axios from 'axios';
import { Invoice } from '../types/invoice';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const invoiceService = {
  createInvoice: async (invoice: Invoice) => {
    try {
      const response = await api.post('/v1/invoices/generate', invoice);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 