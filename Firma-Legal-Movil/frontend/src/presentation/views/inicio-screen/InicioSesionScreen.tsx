import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { InicioSesionScreenStyle as styles } from './inicio_sesion_screen_styles';
import viewInicioSesionScreenModel from './viewInicioSesionScreenModel';
import Checkbox from 'expo-checkbox'; // Cambia esta línea

const InicioSesionScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    autenticacion,
    abrirLeyTratamientoDatos,
    aceptaDatos,
    setAceptaDatos,
  } = viewInicioSesionScreenModel(); // Importar el modelo de vista


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

      {/* Texto de aceptación de ley de datos */}
      <View style={styles.legalContainer}>
        <Checkbox
          value={aceptaDatos}
          onValueChange={setAceptaDatos}
          color={aceptaDatos ? '#3b82f6' : undefined}
        />
  
        <Text style={styles.legalText}>
          
          Acepto el tratamiento de mis datos personales conforme a la{' '}
          <Text style={styles.linkText} onPress={abrirLeyTratamientoDatos}>
            Ley 1581 de 2012
          </Text>
          {' '}de protección de datos personales.
        </Text>
      </View>

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
      {/* <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="google" size={20} color="#DB4437" style={styles.icon} />
        <Text style={styles.socialButtonText}>Continuar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="apple" size={20} color="#000" style={styles.icon} />
        <Text style={styles.socialButtonText}>Continuar con Apple</Text>
      </TouchableOpacity> */}

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
