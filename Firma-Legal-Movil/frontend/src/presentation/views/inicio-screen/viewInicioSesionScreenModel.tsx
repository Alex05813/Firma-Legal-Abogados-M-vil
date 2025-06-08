import React, { useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBaseUrl } from '../../../domain/services/getBaseUrl';
import {jwtDecode} from 'jwt-decode';
import { AxiosError } from '../../../domain/models/axios-error/interface-axioserror';
import { CustomJwtPayload } from '../../../domain/models/jwtpayoad/interface-jwt';


const viewInicioSesionScreenModel = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  type NavigationProps = StackNavigationProp<RootStackParamList, 'InicioSesionScreen'>;
const navigation = useNavigation<NavigationProps>();


  const handleGoogleLogin = () => {
    // Lógica para iniciar sesión con Google
  };
  const handleAppleLogin = () => {
    // Lógica para iniciar sesión con Apple
  };

  const limpiar_formulario = () =>{
    setEmail('')
    setPassword('')
  }

  const autenticacion = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      const emailtrimed = email.trim();
      const passwordtrimed = password.trim();
      const baseUrl = getBaseUrl();
      const response = await axios.post(`${baseUrl}/autenticacion`, {
        email: emailtrimed,
        password: passwordtrimed
      }, {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data?.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        const decodedToken = jwtDecode<CustomJwtPayload>(response.data.token); // Decodificar el token

        const numero_identificacion = decodedToken.numeroIdentificacion; 
        console.log('Número de identificación obtenido en el Inicio de sesion:', numero_identificacion); 

        const nombre_rol = decodedToken.nombre_rol;
        console.log('Nombre de rol obtenido en el Inicio de sesion:', nombre_rol);

        const nombre_usuario = decodedToken.nombre+" "+ decodedToken.apellido;
        console.log('Nombre de usuario obtenido en el Inicio de sesion:', nombre_usuario);
        

        ToastAndroid.show('¡Inicio de sesión exitoso!', ToastAndroid.SHORT);

        if (nombre_rol === 'cliente') {
          navigation.navigate('ClientePrincipalScreen',{
            numIdentificacion: numero_identificacion,
          });
        } else if (nombre_rol === 'abogado') {
          navigation.navigate('AbogadoPrincipalScreen',{
            numIdentificacion: numero_identificacion,
            nombre: nombre_usuario,
          });
        }
        limpiar_formulario();
        
    } else {
        ToastAndroid.show('Error: Formato de respuesta inesperado', ToastAndroid.SHORT);
    }
    } catch (error) {
    const axiosError = error as AxiosError; // Type assertion
      console.error("Error detallado:", {
        message: axiosError.message,
    response: axiosError.response?.data,
    status: axiosError.response?.status,
      });
      ToastAndroid.show(axiosError.response?.data?.message || 'Error en la autenticación', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    handleGoogleLogin,
    handleAppleLogin,
    autenticacion,
    limpiar_formulario,
  }
}

export default viewInicioSesionScreenModel;
