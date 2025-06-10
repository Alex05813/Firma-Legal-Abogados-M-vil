import axios from 'axios';
import { getBaseUrl } from '../../../../domain/services/getBaseUrl';

interface ProcessData {
  id_proceso?: number;
  descripcion: string;
  estado: string;
  fecha_inicio: string;
  numeroIdentificacionCliente: string;
  numeroIdentificacionAbogado: string;
  id_tipo?: number;
  id_subproceso?: number | null;
  id_docesp?: number | null;
}

const API_URL = 'http://192.168.78.101:9000/api/procesos'; 
const baseurl = getBaseUrl(); // Obtiene la URL base de la API

export const ProcessService = {
  // Obtener todos los procesos
  async getAllProcesses() {
    try {
      const response = await axios.get(`${baseurl}/procesos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching processes:', error);
      throw error;
    }
  },

  // Obtener un proceso específico por ID
  async getProcessById(id_proceso: number | string) {
    try {
      const response = await axios.get(`${baseurl}/procesos/${id_proceso}`);
      console.log(`Respuesta del servidor para el proceso ${id_proceso}:`, response.data);
      
      
      if (!response.data) {
        throw new Error('Respuesta del servidor sin datos');
      }

      // Verificación de campos mínimos
      const requiredFields = ['id_proceso', 'descripcion', 'fecha_inicio'];
      for (const field of requiredFields) {
        if (response.data[field] === undefined) {
          throw new Error(`Campo requerido faltante: ${field}`);
        }
      }

      return response.data;
    } catch (error: any) {
      console.error('Error en getProcessById:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Error al obtener el proceso';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Proceso no encontrado';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      throw new Error(errorMessage);
    }
  },

  // Buscar procesos por ID de cliente
  async getProcessesByClientId(numeroIdentificacionCliente: string) {
    try {
      const response = await axios.get(`${baseurl}/procesos/${numeroIdentificacionCliente}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching processes for client ${numeroIdentificacionCliente}:`, error);
      throw error;
    }
  },

  // Actualizar un proceso
  async updateProcess(id_proceso: number | string, processData: ProcessData) {
    try {
      console.log(`Actualizando proceso ${id_proceso} con datos:`, processData);
      
      const response = await axios.put(`${baseurl}/procesos/${id_proceso}`, processData, {
        headers: {
          'Content-Type': 'application/json'
        },
        validateStatus: (status) => status < 500
      });
  
      console.log('Respuesta del servidor:', response.data);
  
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
  
      if (response.status === 404) {
        throw new Error(`Proceso con ID ${id_proceso} no encontrado`);
      }
  
      if (response.status === 400) {
        const errorMsg = response.data?.message || 'Datos inválidos';
        const validationErrors = response.data?.validationErrors;
        if (validationErrors) {
          throw new Error(`${errorMsg}: ${JSON.stringify(validationErrors)}`);
        }
        throw new Error(errorMsg);
      }
  
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    } catch (error: unknown) {
      console.error('Error detallado:', error);
      
      let errorMessage = 'Error al actualizar el proceso';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 
                      error.response?.data?.error ||
                      error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      throw new Error(errorMessage);
    }
  }
};
