// FacturaService.ts
import axios from 'axios';
import { getBaseUrl } from '../../../../domain/services/getBaseUrl';

const API_URL = 'http:// 192.168.1.34:9000/api/facturas'; 
const baseurl = getBaseUrl(); // Assuming this function returns the base URL for your API

export const FacturaService = {
  async getAllFacturas() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching facturas:', error);
      throw error;
    }
  },

  async getFacturaById(id_factura: number | string) {
    try {
      const response = await axios.get(`${API_URL}/${id_factura}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching factura:', error);
      throw error;
    }
  },

  async createFactura(facturaData: any) {
    try {
      const response = await axios.post(API_URL, facturaData);
      return response.data;
    } catch (error) {
      console.error('Error creating factura:', error);
      throw error;
    }
  },

  async updateFactura(id_factura: number | string, facturaData: any) {
    try {
      const response = await axios.put(`${API_URL}/${id_factura}`, facturaData);
      return response.data;
    } catch (error) {
      console.error('Error updating factura:', error);
      throw error;
    }
  },

  async deleteFactura(id_factura: number | string) {
    try {
      const response = await axios.delete(`${API_URL}/${id_factura}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting factura:', error);
      throw error;
    }
  }
};