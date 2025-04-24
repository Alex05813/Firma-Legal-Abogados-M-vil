import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ClientePrincipalScreenStyles as styles } from './cliente_principal_screen_styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ClientePrincipalScreen = () => {

  type NavigationProps = StackNavigationProp<RootStackParamList, 'ClientePrincipalScreen'>;
        const navigation = useNavigation<NavigationProps>();
        
  const [profileImage, setProfileImage] = useState(require('../../../../../assets/cliente.jpg'));
  const [documentsCount, setDocumentsCount] = useState(3);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ visible: false, title: '', content: '' });

  // Cambiar foto de perfil
  const handleImageChange = async () => {
    Alert.alert(
      'Cambiar foto',
      'Selecciona una opción',
      [
        {
          text: 'Tomar foto',
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permiso requerido', 'Necesitamos acceso a tu cámara');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });
            if (!result.canceled) {
              setProfileImage({ uri: result.assets[0].uri });
            }
          },
        },
        {
          // Errores sin identificacion (Alert)
          text: 'Elegir de galería',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });
            if (!result.canceled) {
              setProfileImage({ uri: result.assets[0].uri });
            }
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };


// Errores sin identicar (type, Alert, name)
  // Subir documentos
  const handleUploadDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'image/*', 'application/vnd.ms-excel'],
        copyToCacheDirectory: true,
      });
      
      if (result.type === 'success') {
        setDocumentsCount(documentsCount + 1);
        Alert.alert('Éxito', `Documento ${result.name} subido correctamente`);
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo subir el documento');
    }
  };

  // Mostrar modal con información
  const showModal = (title: string, content: string) => {
    setModalContent({ visible: true, title, content });
  };

  return (
    <View style={styles.container}>
      {/* Header con menú */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImageChange} style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.cameraIcon}>
            <Feather name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.greeting}>Hola Pablo Armero</Text>
        <Text style={styles.subtitle}>Este es tu resumen de actividad</Text>
        
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <MaterialIcons name="more-vert" size={28} color="#333" />
        </TouchableOpacity>
        
        {/* Menú desplegable */}
        {menuVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome name="cog" size={18} color="#555" />
              <Text style={styles.menuText}>Configuración</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <MaterialIcons name="exit-to-app" size={18} color="#555" />
              <Text style={styles.menuText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Tarjetas de resumen */}
        <View style={styles.cardRow}>
          <TouchableOpacity 
            style={styles.summaryCard}
            onPress={() => showModal(
              'Cita programada', 
              'Tienes una cita con el Abogado Oscar Parra el 25/06/2023 a las 15:30 hrs'
            )}
          >
            <Text style={styles.cardNumber}>1</Text>
            <Text style={styles.cardTitle}>Citas pendientes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.summaryCard}
            onPress={() => showModal(
              'Documentos pendientes', 
              'Falta adjuntar:\n\n- Fotocopia de cédula (PDF)\n\nPrioridad: Alta\n\nPor favor sube los documentos lo antes posible.'
            )}
          >
            <Text style={styles.cardNumber}>1</Text>
            <Text style={styles.cardTitle}>Alertas hoy</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Procesos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Procesos</Text>
          <View style={styles.processCard}>
            <Text style={styles.emptyText}>No encontramos expedientes</Text>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleUploadDocument}
            >
              <Text style={styles.buttonText}>Adjunta tus archivos</Text>
              <MaterialIcons name="cloud-upload" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.fileTypes}>(PDF, Word, Excel, Imágenes)</Text>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Proceso Actual:</Text>
              <Text style={styles.statValue}>Divorcio</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Documentos guardados:</Text>
              <Text style={styles.statValue}>{documentsCount}</Text>
            </View>
          </View>
        </View>

        {/* Información General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información General</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Última actualización: 20/06/2023</Text>
            <Text style={styles.infoText}>
              Notas del abogado:{"\n\n"}
              "El proceso de divorcio está avanzando según lo planeado. Hemos recibido todos los documentos iniciales. 
              Faltaría programar la audiencia con el juzgado una vez complete el pago de los honorarios pendientes."
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
  <Image 
    source={require('../../../../../assets/abogados.jpg')} 
    style={styles.footerImageLeft} 
    resizeMode="cover"
  />
  <Image 
    source={require('../../../../../assets/griegos.jpg')} 
    style={styles.footerImageRight} 
    resizeMode="cover"
  />
</View>
      </ScrollView>

      {/* Modal para mostrar información */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalContent.visible}
        onRequestClose={() => setModalContent({...modalContent, visible: false})}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalText}>{modalContent.content}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalContent({...modalContent, visible: false})}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos mejorados


export default ClientePrincipalScreen;