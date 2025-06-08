import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interfaz para el usuario
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  avatar?: string;
  numeroIdentificacion?: string;
}

// Custom hook para manejar la lógica de configuración
const viewAbogadoConfiguracionScreenModel = () => {
  // Estados
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [notificacionesActivadas, setNotificacionesActivadas] = useState(true);
  const [idioma, setIdioma] = useState('Español');
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario al inicializar
  useEffect(() => {
    cargarDatosUsuario();
    cargarConfiguraciones();
  }, []);

  // Función para cargar datos del usuario desde AsyncStorage o API
  const cargarDatosUsuario = async () => {
    try {
      setLoading(true);
      
      // Intentar cargar desde AsyncStorage primero
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      
      if (usuarioGuardado) {
        const usuarioData = JSON.parse(usuarioGuardado);
        setUsuario(usuarioData);
      } else {
        // Si no hay datos guardados, usar datos por defecto o hacer llamada a API
        const usuarioDefault: Usuario = {
          id: '1',
          nombre: 'Juan Pérez',
          email: 'juan.perez@ejemplo.com',
          rol: 'Abogado',
          numeroIdentificacion: '12345678'
        };
        setUsuario(usuarioDefault);
        
        // Guardar en AsyncStorage para futuras cargas
        await AsyncStorage.setItem('usuario', JSON.stringify(usuarioDefault));
      }
      
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      // Fallback con datos por defecto
      setUsuario({
        id: '1',
        nombre: 'Usuario',
        email: 'usuario@ejemplo.com',
        rol: 'Abogado'
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar configuraciones guardadas
  const cargarConfiguraciones = async () => {
    try {
      // Cargar tema
      const temaGuardado = await AsyncStorage.getItem('temaOscuro');
      if (temaGuardado !== null) {
        setTemaOscuro(JSON.parse(temaGuardado));
      }

      // Cargar notificaciones
      const notificacionesGuardadas = await AsyncStorage.getItem('notificacionesActivadas');
      if (notificacionesGuardadas !== null) {
        setNotificacionesActivadas(JSON.parse(notificacionesGuardadas));
      }

      // Cargar idioma
      const idiomaGuardado = await AsyncStorage.getItem('idioma');
      if (idiomaGuardado !== null) {
        setIdioma(idiomaGuardado);
      }

    } catch (error) {
      console.error('Error al cargar configuraciones:', error);
    }
  };

  // Función para cambiar el tema
  const cambiarTema = async (nuevoTema: boolean) => {
    try {
      setTemaOscuro(nuevoTema);
      await AsyncStorage.setItem('temaOscuro', JSON.stringify(nuevoTema));
      
      // Aquí podrías agregar lógica adicional para aplicar el tema globalmente
      // Por ejemplo, usando un contexto de tema
      console.log(`Tema cambiado a: ${nuevoTema ? 'Oscuro' : 'Claro'}`);
      
    } catch (error) {
      console.error('Error al cambiar tema:', error);
    }
  };

  // Función para cambiar configuración de notificaciones
  const cambiarNotificaciones = async (nuevasNotificaciones: boolean) => {
    try {
      setNotificacionesActivadas(nuevasNotificaciones);
      await AsyncStorage.setItem('notificacionesActivadas', JSON.stringify(nuevasNotificaciones));
      
      // Aquí podrías agregar lógica para activar/desactivar notificaciones push
      console.log(`Notificaciones ${nuevasNotificaciones ? 'activadas' : 'desactivadas'}`);
      
    } catch (error) {
      console.error('Error al cambiar notificaciones:', error);
    }
  };

  // Función para cambiar idioma
  const cambiarIdioma = async (nuevoIdioma: string) => {
    try {
      setIdioma(nuevoIdioma);
      await AsyncStorage.setItem('idioma', nuevoIdioma);
      
      // Aquí podrías agregar lógica para cambiar el idioma de la app
      console.log(`Idioma cambiado a: ${nuevoIdioma}`);
      
    } catch (error) {
      console.error('Error al cambiar idioma:', error);
    }
  };

  // Función para actualizar datos del usuario
  const actualizarUsuario = async (nuevosdatos: Partial<Usuario>) => {
    try {
      if (usuario) {
        const usuarioActualizado = { ...usuario, ...nuevosdatos };
        setUsuario(usuarioActualizado);
        await AsyncStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
        
        // Aquí podrías hacer una llamada a la API para actualizar en el servidor
        console.log('Usuario actualizado:', usuarioActualizado);
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      // Limpiar datos del usuario y configuraciones si es necesario
      await AsyncStorage.multiRemove(['usuario', 'token', 'sesionActiva']);
      
      // Resetear estados
      setUsuario(null);
      
      // Aquí podrías navegar a la pantalla de login
      // navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
      
      console.log('Sesión cerrada exitosamente');
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Función para obtener configuraciones del sistema
  const obtenerConfiguracionSistema = () => {
    return {
      version: '1.0.0',
      buildNumber: '100',
      plataforma: 'React Native',
    };
  };

  // Función para validar configuraciones
  const validarConfiguraciones = () => {
    // Validaciones básicas
    if (!usuario) {
      console.warn('No hay datos de usuario cargados');
      return false;
    }
    
    return true;
  };

  // Función para exportar configuraciones (para backup)
  const exportarConfiguraciones = async () => {
    try {
      const configuraciones = {
        temaOscuro,
        notificacionesActivadas,
        idioma,
        fechaExportacion: new Date().toISOString(),
      };
      
      return JSON.stringify(configuraciones);
    } catch (error) {
      console.error('Error al exportar configuraciones:', error);
      return null;
    }
  };

  // Función para importar configuraciones (para restore)
  const importarConfiguraciones = async (configuracionesString: string) => {
    try {
      const configuraciones = JSON.parse(configuracionesString);
      
      if (configuraciones.temaOscuro !== undefined) {
        await cambiarTema(configuraciones.temaOscuro);
      }
      
      if (configuraciones.notificacionesActivadas !== undefined) {
        await cambiarNotificaciones(configuraciones.notificacionesActivadas);
      }
      
      if (configuraciones.idioma !== undefined) {
        await cambiarIdioma(configuraciones.idioma);
      }
      
      console.log('Configuraciones importadas exitosamente');
      return true;
      
    } catch (error) {
      console.error('Error al importar configuraciones:', error);
      return false;
    }
  };

  // Retornar todas las funciones y estados que necesita el componente
  return {
    // Estados
    usuario,
    temaOscuro,
    notificacionesActivadas,
    idioma,
    loading,
    
    // Funciones principales
    cambiarTema,
    cambiarNotificaciones,
    cambiarIdioma,
    actualizarUsuario,
    cerrarSesion,
    
    // Funciones auxiliares
    cargarDatosUsuario,
    obtenerConfiguracionSistema,
    validarConfiguraciones,
    exportarConfiguraciones,
    importarConfiguraciones,
  };
};

export default viewAbogadoConfiguracionScreenModel;