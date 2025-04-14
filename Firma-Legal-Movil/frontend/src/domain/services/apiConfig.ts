import axios from 'axios';
import { Platform } from 'react-native';

// 1. Sistema de caché para la IP
let cachedBaseURL: string | null = null;

// 2. Función para detectar IP automáticamente (funciona en iOS/Android/Web)
const detectLocalIP = async (): Promise<string> => {
  try {
    if (Platform.OS === 'web') {
      return window.location.hostname;
    }
    
    // Para React Native (Android/iOS)
    const resp = await fetch('http://ipecho.net/plain');
    return await resp.text();
  } catch (error) {
    console.warn('No se pudo detectar la IP. Usando localhost como fallback');
    return 'localhost';
  }
};

// 3. Configuración inteligente de la URL base
export const getAPIBaseURL = async (): Promise<string> => {
  if (cachedBaseURL) return cachedBaseURL;

  if (__DEV__) {
    const ip = await detectLocalIP();
    cachedBaseURL = `http://${ip}:9000`; // Usa tu puerto del backend
  } else {
    cachedBaseURL = 'https://api.tuproduccion.com'; // URL de producción
  }

  return cachedBaseURL;
};

// 4. Instancia de Axios lista para usar
export const createAPIInstance = async () => {
  const baseURL = await getAPIBaseURL();
  return axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
};

// 5. Instancia pre-configurada (recomendada para la mayoría de casos)
export const api = await createAPIInstance();