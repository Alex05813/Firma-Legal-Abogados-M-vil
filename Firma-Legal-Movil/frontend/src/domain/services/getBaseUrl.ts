
// ____________Deteccion dinamica de la IP______________

import Constants from 'expo-constants';

let baseUrl = '';

export const getBaseUrl = (): string => {
  
  if (baseUrl) {
    return baseUrl;
  }

  try {
    const manifest = Constants.manifest || Constants.expoConfig || {};
    // debuggerHost is usually in the format "192.168.1.39:19000"
    const debuggerHost = manifest.debuggerHost || manifest.hostUri || '';
    if (!debuggerHost) {
      console.warn('No se pudo obtener debuggerHost de Expo Constants');
      return 'http://localhost:9000/api';
    }
    const ip = debuggerHost.split(':')[0];
    baseUrl = `http://${ip}:9000/api`;
    console.log('IP obtenida desde Expo Constants:', ip);
    return baseUrl;
  } catch (error) {
    console.error('Error obteniendo la IP desde Expo Constants:', error);
    return 'http://localhost:9000/api';
  }
};
