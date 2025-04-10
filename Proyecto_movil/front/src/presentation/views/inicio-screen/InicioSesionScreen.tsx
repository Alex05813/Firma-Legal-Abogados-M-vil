import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { InicioSesionScreen as styles } from './inicio_sesion_screen_styles';

const HomeGeneralScreen = () => {
  const [isMenu2Visible, setIsMenu2Visible] = useState(false);

  type NavigationProps = StackNavigationProp<RootStackParamList, 'InicioSesionScreen'>;
  const navigation = useNavigation<NavigationProps>();

  const toggleMenu2 = () => {
    setIsMenu2Visible(!isMenu2Visible);
  }

  const closeMenu = () => {
    setIsMenu2Visible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View>

        {/* Panel superior */}
        <View style={styles.header}>


          {/* Menu de hamburguesa parte superior derecha */}
          <TouchableOpacity onPress={toggleMenu2}>
            <Image
              source={require('../../../../assets/hamburger_menu.png')} // Asegúrate de tener este ícono en la carpeta de assets
              style={styles.menuIcon}
            />
          </TouchableOpacity>

        </View>

        {isMenu2Visible && (
          <View style={styles.menuOptions}>

            <TouchableOpacity
              onPress={() => {
                //   navigation.navigate('HomeClientScreen')
              }}>
              <Text style={styles.menuOptionText}>Centro de ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log('Opcion 2 seleccionada');
              }}>
              <Text style={styles.menuOptionText}>Reportar un problema</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log('Opcion 2 seleccionada');
              }}>
              <Text style={styles.menuOptionText}>Acerca de nosotros/ Contactenos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log('Opcion 2 seleccionada');
              }}>
              <Text style={styles.menuOptionText}>Informacion</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log('Opcion de agenda seleccionada');
                navigation.navigate('AbogadoPrincipalScreen')
              }}>
              <Text style={styles.menuOptionText}>Boton de "INICIAR" del inicio de sesion de juan</Text>
            </TouchableOpacity>

          </View>
        )}

        {/* Imagen principal */}

        {/* Texto "DESCUBRIR MÁS" */}
        
        
        <Text style={styles.discoverMoreText}>Inicio de sesion que debe hacer Juan (HomeGeneralScreen)</Text>

        <TouchableOpacity
          onPress={() => {
            console.log('Redirigiendo a la pantalla de inicio para abogados');
            navigation.navigate('AbogadoPrincipalScreen'); // Reemplaza con el nombre correcto
          }}>
          <Text>_________________Inicia como Abogado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log('Redirigiendo a la pantalla de inicio para abogados');
            navigation.navigate("ClientePrincipalScreen"); // Reemplaza con el nombre correcto
          }}>
          <Text>_________________Inicia como Cliente</Text>
        </TouchableOpacity>

      </View>
      
      
    </TouchableWithoutFeedback>
  )
}

export default HomeGeneralScreen;