import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Switch, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AbogadoConfiguracionScreenStyles as styles } from './abogado_configuracion_screen_styles';
import viewAbogadoConfiguracionScreenModel from './viewAbogadoConfiguracionScreenModel';

type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoConfiguracionScreen'>;
type ConfiguracionRouteProp = RouteProp<RootStackParamList, 'AbogadoConfiguracionScreen'>;

const ConfiguracionScreen = () => {
  const route = useRoute<ConfiguracionRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  
  const { 
    usuario,
    temaOscuro,
    notificacionesActivadas,
    idioma,
    cambiarTema,
    cambiarNotificaciones,
    cambiarIdioma,
    cerrarSesion
  } = viewAbogadoConfiguracionScreenModel();

  // Estados locales para los switches
  const [switchTema, setSwitchTema] = useState(temaOscuro);
  const [switchNotificaciones, setSwitchNotificaciones] = useState(notificacionesActivadas);

  useEffect(() => {
    setSwitchTema(temaOscuro);
    setSwitchNotificaciones(notificacionesActivadas);
  }, [temaOscuro, notificacionesActivadas]);

  const handleCambiarTema = (valor: boolean) => {
    setSwitchTema(valor);
    cambiarTema(valor);
  };

  const handleCambiarNotificaciones = (valor: boolean) => {
    setSwitchNotificaciones(valor);
    cambiarNotificaciones(valor);
  };

  const confirmarCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => cerrarSesion(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}>
          <Text style={styles.backButton}>Volver</Text>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Configuración</Text>
          <Image
            source={require('../../../../../assets/messi.jpg')}
            style={styles.settingsIcon}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Sección de Perfil de Usuario */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          
          <View style={styles.perfilCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={usuario?.avatar ? { uri: usuario.avatar } : require('../../../../../assets/messi.jpg')}
                style={styles.avatar}
              />
            </View>
            
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{usuario?.nombre || 'Usuario'}</Text>
              <Text style={styles.userEmail}>{usuario?.email || 'email@ejemplo.com'}</Text>
              <Text style={styles.userRole}>{usuario?.rol || 'Abogado'}</Text>
            </View>
            
            {/* <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('AbogadoAgendaScreen')}> */}
              <Text style={styles.editButtonText}>Editar</Text>
            {/* </TouchableOpacity> */}
          </View>
        </View>

        {/* Sección de Apariencia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apariencia</Text>
          
          <View style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Tema Oscuro</Text>
                <Text style={styles.optionDescription}>
                  Activa el modo oscuro para una mejor experiencia nocturna
                </Text>
              </View>
            </View>
            <Switch
              value={switchTema}
              onValueChange={handleCambiarTema}
              trackColor={{ false: '#E5E5E5', true: '#4A90E2' }}
              thumbColor={switchTema ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Sección de Notificaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          
          <View style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Notificaciones Push</Text>
                <Text style={styles.optionDescription}>
                  Recibe notificaciones sobre tus citas y procesos
                </Text>
              </View>
            </View>
            <Switch
              value={switchNotificaciones}
              onValueChange={handleCambiarNotificaciones}
              trackColor={{ false: '#E5E5E5', true: '#4A90E2' }}
              thumbColor={switchNotificaciones ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Sonidos</Text>
                <Text style={styles.optionDescription}>
                  Configurar sonidos de notificaciones
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Idioma */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idioma y Región</Text>
          
          {/* <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('IdiomaScreen')}> */}
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Idioma</Text>
                <Text style={styles.optionDescription}>
                  {idioma || 'Español'}
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          {/* </TouchableOpacity> */}
        </View>

        {/* Sección de Seguridad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
          
          {/* <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('CambiarPasswordScreen')}> */}
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Cambiar Contraseña</Text>
                <Text style={styles.optionDescription}>
                  Actualiza tu contraseña de acceso
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          {/* </TouchableOpacity> */}

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Autenticación Biométrica</Text>
                <Text style={styles.optionDescription}>
                  Usa huella dactilar o Face ID
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Ayuda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayuda y Soporte</Text>
          
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Centro de Ayuda</Text>
                <Text style={styles.optionDescription}>
                  Preguntas frecuentes y guías
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Contactar Soporte</Text>
                <Text style={styles.optionDescription}>
                  Envía un mensaje al equipo de soporte
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Información */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          
          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Acerca de</Text>
                <Text style={styles.optionDescription}>
                  Versión 1.0.0
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard}>
            <View style={styles.optionContent}>
              <View style={styles.optionIcon}>
                <Image
                  source={require('../../../../../assets/messi.jpg')}
                  style={styles.iconImage}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Términos y Condiciones</Text>
                <Text style={styles.optionDescription}>
                  Lee nuestros términos de servicio
                </Text>
              </View>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de Cerrar Sesión */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={confirmarCerrarSesion}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Espacio adicional para el scroll */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

export default ConfiguracionScreen;