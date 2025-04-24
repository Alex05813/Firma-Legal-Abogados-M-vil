import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { InicioSesionScreenStyle as styles } from './inicio_sesion_screen_styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBaseUrl } from '../../../domain/services/getBaseUrl';
import {jwtDecode} from 'jwt-decode';

// Define la estructura de tu token:
interface CustomJwtPayload {
  numeroIdentificacion: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  nombre_rol: string;
}

const InicioSesionScreen = () => {
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

  // Mirar errores especificamente para depurar codigo
  interface AxiosError {
    message: string;
    response?: {
      data: any;
      status: number;
    };
  }

  const autenticacion = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      const baseUrl = getBaseUrl();
      const response = await axios.post(`${baseUrl}/autenticacion`, {
        email,
        password
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
        ToastAndroid.show('¡Inicio de sesión exitoso!', ToastAndroid.SHORT);
        
        navigation.navigate('AbogadoPrincipalScreen',{
          numIdentificacion: numero_identificacion,
        });
        // navigation.navigate('ClientePrincipalScreen')
        // limpiar_formulario();
        
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



  return (
    
    <View style={styles.container}>
      {/* Logo */}
      
      {/* Título */}
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Introduce un email para continuar</Text>

      {/* Campos de entrada */}
      <Text style={styles.label}>Correo electrónico*</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña*</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        // secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón continuar */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]}
        onPress={autenticacion}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Verificando...' : 'Continuar'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.or}>o</Text>

      {/* Botones de Google y Apple */}
      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="google" size={20} color="#DB4437" style={styles.icon} />
        <Text style={styles.socialButtonText}>Continuar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="apple" size={20} color="#000" style={styles.icon} />
        <Text style={styles.socialButtonText}>Continuar con Apple</Text>
      </TouchableOpacity>

      {/* Texto de políticas */}
      <Text style={styles.policyText}>
        Al iniciar sesión con mi login social, acepto vincular mi cuenta, acepto
        vincular mi cuenta conforme a las Políticas de Privacidad
      </Text>

      {/* Icono de Telegram */}
      <TouchableOpacity style={styles.telegramButton}>
        <FontAwesome name="send" size={30} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  );
};

export default InicioSesionScreen;
