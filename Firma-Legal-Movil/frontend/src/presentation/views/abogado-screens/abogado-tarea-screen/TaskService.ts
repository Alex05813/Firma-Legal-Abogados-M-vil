import axios from 'axios';
import { getBaseUrl } from '../../../../domain/services/getBaseUrl';

const API_URL = 'http://192.168.1.34:9000/api/tareas'; // Ajusta la URL según tu configuración
const baseurl = getBaseUrl(); // Obtiene la URL base de la API

export const TaskService = {
  // Obtener todas las tareas con filtros opcionales
  async getAllTasks(filters = {}) {
    try {
      const response = await axios.get(`${baseurl}/tareas`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Obtener una tarea por ID
  async getTaskById(id_tarea: number) {
    try {
      const response = await axios.get(`${baseurl}/tareas${id_tarea}`);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Verificación de campos mínimos
      const requiredFields = ['id_tarea', 'titulo', 'descripcion', 'fecha', 'estado'];
      for (const field of requiredFields) {
        if (response.data.tarea[field] === undefined) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      return response.data;
    } catch (error: any) {
      console.error('Error in getTaskById:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Error al obtener la tarea';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Tarea no encontrada';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      throw new Error(errorMessage);
    }
  },

  // Crear una nueva tarea
  async createTask(taskData: any) {
    try {
      const response = await axios.post(`${baseurl}/tareas`, taskData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating task:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Error al crear la tarea';
      if (error.response?.data?.details) {
        errorMessage = error.response.data.details.join('\n');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  // Actualizar una tarea
  async updateTask(id_tarea: number, taskData: any) {
    try {
      console.log('Enviando a:', `${baseurl}/tareas/${id_tarea}`); // Depuración
      console.log('Datos:', taskData); // Depuración
      
      const response = await axios.put(`${baseurl}/tareas/${id_tarea}`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Descomenta si necesitas autenticación
        }
      });
      
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Error al actualizar la tarea');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Error en updateTask:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Error al actualizar la tarea';
      if (error.response?.data?.details) {
        errorMessage = error.response.data.details.join('\n');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  // Eliminar una tarea
  async deleteTask(id_tarea: number) {
    try {
      const response = await axios.delete(`${baseurl}/tareas/${id_tarea}`);
      return response.data;
    } catch (error: any) {
      console.error('Error deleting task:', error);
      throw new Error(error.response?.data?.message || 'Error al eliminar la tarea');
    }
  },

  // Cambiar estado de una tarea
  async changeTaskStatus(id_tarea: number, newStatus: string) {
    try {
      const response = await axios.patch(`${baseurl}/tareas/${id_tarea}/estado`, { estado: newStatus });
      return response.data;
    } catch (error: any) {
      console.error('Error changing task status:', error);
      throw new Error(error.response?.data?.message || 'Error al cambiar el estado de la tarea');
    }
  }
};