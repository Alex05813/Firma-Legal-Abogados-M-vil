import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Modal, 
  Alert,
  Animated,
  Easing
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { AbogadoPrincialScreenStyles as styles } from './principal_abogado_screen_styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { CheckboxItem } from '../../../../domain/models/checkboxitem/interface-checkboxitem';
import { UserProfile } from '../../../../domain/models/userprofile/interface-userprofile';
import { Task } from '../../../../domain/models/task/interface-task';
import { FileData } from '../../../../domain/models/file-data/interface-fileData';
import { AlertItem } from '../../../../domain/models/alert-item/interface-alertItem';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ← AGREGAR ESTA IMPORTACIÓN


type AbogadoPrincipalRouteProp = RouteProp<RootStackParamList, 'AbogadoPrincipalScreen'>;

const HomeScreen: React.FC = () => {
  const route = useRoute<AbogadoPrincipalRouteProp>();
  const { numIdentificacion, nombre } = route.params; // Extrae el parámetro
  
  type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoPrincipalScreen'>;
          const navigation = useNavigation<NavigationProps>();
  const [profile, setProfile] = useState<UserProfile>({
    name: nombre,
    imageUri: require('../../../../../assets/billgates.jpg')
  });
  // ← NUEVA FUNCIÓN PARA CARGAR LA FOTO GUARDADA
  const loadSavedProfileImage = async () => {
    try {
      const savedImageUri = await AsyncStorage.getItem(`profileImage_${numIdentificacion}`);
      if (savedImageUri) {
        // Verificar si el archivo aún existe
        const fileInfo = await FileSystem.getInfoAsync(savedImageUri);
        if (fileInfo.exists) {
          setProfile(prev => ({ ...prev, imageUri: { uri: savedImageUri } }));
        } else {
          // Si el archivo no existe, eliminar la referencia guardada
          await AsyncStorage.removeItem(`profileImage_${numIdentificacion}`);
        }
      }
    } catch (error) {
      console.log('Error loading saved profile image:', error);
    }
  };

  // ← NUEVA FUNCIÓN PARA GUARDAR LA FOTO
  const saveProfileImage = async (imageUri: string) => {
    try {
      // Crear un directorio permanente para las fotos de perfil
      const profileImagesDir = `${FileSystem.documentDirectory}profile_images/`;
      const dirInfo = await FileSystem.getInfoAsync(profileImagesDir);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(profileImagesDir, { intermediates: true });
      }

      // Crear un nombre único para la imagen
      const fileName = `profile_${numIdentificacion}_${Date.now()}.jpg`;
      const newImageUri = `${profileImagesDir}${fileName}`;

      // Copiar la imagen al directorio permanente
      await FileSystem.copyAsync({
        from: imageUri,
        to: newImageUri
      });

      // Guardar la URI en AsyncStorage
      await AsyncStorage.setItem(`profileImage_${numIdentificacion}`, newImageUri);

      return newImageUri;
    } catch (error) {
      console.log('Error saving profile image:', error);
      return imageUri; // Retornar la URI original si hay error
    }
  };
  

  const [stats, setStats] = useState<CheckboxItem[]>([
    { id: '1', label: '#cProcesos totales', checked: false },
    { id: '2', label: '# Documentos guardados', checked: true },
    { id: '3', label: '# Usuarios en la firma', checked: false },
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Revisar contrato de arrendamiento',
      description: 'El cliente Martínez necesita revisión del contrato antes de firmar',
      dueDate: '15/05/2023',
    },
  ]);

  const [alerts] = useState<AlertItem[]>([
    {
      id: '1',
      title: 'Audiencia próxima',
      message: 'La audiencia del caso Rodríguez está programada para mañana a las 9:00 AM',
      priority: 'high',
    },
  ]);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
  const slideAnim = useRef(new Animated.Value(-300)).current;

    // ← CARGAR LA FOTO AL INICIAR LA PANTALLA
  useEffect(() => {
    loadSavedProfileImage();
  }, [numIdentificacion]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso necesario', 'Necesitamos acceso a tu galería para cambiar la foto de perfil');
      }
    })();
  }, []);

  const toggleMenu = () => {
    if (showMenu) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setShowMenu(false));
    } else {
      setShowMenu(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleCheckboxToggle = (id: string) => {
    setStats(prevStats =>
      prevStats.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // ← MODIFICAR LA FUNCIÓN pickImage
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      
      // Guardar la imagen de manera permanente
      const savedImageUri = await saveProfileImage(selectedImageUri);
      
      // Actualizar el estado
      setProfile({ ...profile, imageUri: { uri: savedImageUri } });
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      
      // Guardar la imagen de manera permanente
      const savedImageUri = await saveProfileImage(selectedImageUri);
      
      // Actualizar el estado
      setProfile({ ...profile, imageUri: { uri: savedImageUri } });
    }
  };
  const showImagePickerOptions = () => {
    Alert.alert(
      'Cambiar foto de perfil',
      '¿Cómo deseas cambiar tu foto?',
      [
        {
          text: 'Tomar foto',
          onPress: takePhoto,
        },
        {
          text: 'Elegir de galería',
          onPress: pickImage,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  const handleOpenFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
        copyToCacheDirectory: true
      });
  
      if (!result.canceled) {
        const files = await Promise.all(
          result.assets.map(async (file) => {
            const fileInfo = await FileSystem.getInfoAsync(file.uri);
            
            // Verificación completa del fileInfo
            if (!fileInfo.exists || fileInfo.isDirectory) {
              console.warn('El archivo no existe o es un directorio:', file.uri);
              return {
                name: file.name || 'unnamed',
                size: 0, // Valor por defecto
                uri: file.uri,
                mimeType: file.mimeType || 'application/octet-stream',
              };
            }
  
            return {
              name: file.name || 'unnamed',
              size: fileInfo.size ?? 0, // Usamos el operador nullish coalescing
              uri: file.uri,
              mimeType: file.mimeType || 'application/octet-stream',
            };
          })
        );
  
        setSelectedFiles([...selectedFiles, ...files]);
        Alert.alert('Éxito', 'Archivo(s) adjuntado(s) correctamente');
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
      console.error(err);
    }
  };
  // Errores sin identificacion en esta linea


  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          onPress: () => {
            console.log('Sesión cerrada');
            cerrar_sesion();
          },
        },
      ]
    );
  };

  const cerrar_sesion = () => {
    navigation.navigate('InicioSesionScreen');
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word')) return '📝';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
    if (mimeType.includes('image')) return '🖼️';
    return '📂';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };



  return (
    console.log('Parametro del numero de identificacion:', numIdentificacion), // Aquí puedes usar el ID como necesites;
  
    <ScrollView style={styles.container}>
      {/* Encabezado con menú */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={showImagePickerOptions}>
            <Image 
              source={profile.imageUri}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Hola {profile.name}</Text>
            <Text style={styles.subtitle}>Firma Legal Abogados</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Menú desplegable */}
      {showMenu && (
        <>
          <TouchableOpacity 
            style={styles.menuOverlay}
            onPress={toggleMenu}
            activeOpacity={1}
          />
          <Animated.View 
            style={[
              styles.menuPanel,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <TouchableOpacity style={styles.menuItem} onPress={()=> navigation.navigate('AbogadoConfiguracionScreen')}>
              <Text style={styles.menuItemText}>⚙️ Configuración</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <Text style={styles.menuItemText}>🔒 Cerrar sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}

      {/* Sección de resumen rápido */}
      <View style={styles.summaryContainer}>

{/* 1. Implementacion de navegacion a la pantalla de alex */}
        <TouchableOpacity 
          style={styles.summaryCapsule}
          onPress={() => {
            navigation.navigate('AbogadoTareaScreen')
            setShowTaskModal(true)
          }}>
          <Text style={styles.capsuleTitle}>📌 Tareas pendientes</Text>
          <Text style={styles.capsuleSubtitle}>{tasks.length} pendiente(s)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.summaryCapsule, styles.alertCapsule]}
          onPress={() => setShowAlertModal(true)}
        >
          <Text style={styles.capsuleTitle}>⚠️ Alertas hoy</Text>
          <Text style={styles.capsuleSubtitle}>{alerts.length} alerta(s)</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Procesos con selector de archivos */}
      <View style={styles.section}>
      <Text style={styles.sectionHeader}>📁 Procesos</Text>
        <TouchableOpacity
        onPress={() => {
          navigation.navigate('CasesScreen')
        }}>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.processButton}
          onPress={() => {
            navigation.navigate('CasesScreen')
          }}
        >
          <Text style={styles.processButtonText}>
            Presiona aquí para iniciar un proceso y comienza a organizar tu gestión legal
          </Text>
        </TouchableOpacity>

        {/* Archivos adjuntos */}
        {selectedFiles.length > 0 && (
          <View style={styles.filesContainer}>
            <Text style={styles.filesTitle}>Archivos adjuntos:</Text>
            {selectedFiles.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <Text style={styles.fileIcon}>{getFileIcon(file.mimeType)}</Text>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>


      <View style={styles.summaryContainer}>
      <TouchableOpacity 
          style={styles.summaryCapsule}
          onPress={() => {
            navigation.navigate('AbogadoAgendaScreen',{
              numIdentificacion2: numIdentificacion,
            })
            setShowTaskModal(true)
          }}>
          <Text style={styles.capsuleTitle}>Agenda 🗓️</Text>
          <Text style={styles.capsuleSubtitle}>{tasks.length} pendiente(s)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.summaryCapsule}
          onPress={() => {
            navigation.navigate('FacturasScreen')
            setShowTaskModal(true)
          }}>
          <Text style={styles.capsuleTitle}>📌 Factura</Text>
          <Text style={styles.capsuleSubtitle}>{tasks.length} pendiente(s)</Text>
      </TouchableOpacity>

      </View>
      

      {/* Separador */}
      <View style={styles.divider} />

      {/* Estadísticas */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>📈 Estadísticas</Text>
        <View style={styles.statsContainer}>
          {stats.map(item => (
            <CheckBox
              key={item.id}
              title={item.label}
              checked={item.checked}
              onPress={() => handleCheckboxToggle(item.id)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
          ))}
        </View>
        
        {/* Imágenes decorativas */}
        <View style={styles.imagesContainer}>
          <Image 
            source={require('../../../../../assets/abogados.jpg')} 
            style={styles.decorativeImage}
          />
          <Image 
            source={require('../../../../../assets/griegos.jpg')} 
            style={styles.decorativeImage}
          />
        </View>
      </View>
        {/* Separador */}
      <View style={styles.divider} />

      {/* Falta información */}
      <View style={styles.sectiondos}>
        <Text style={styles.infoText}>
          Carga expedientes y sigue utilizando LAO para nutrir de información tu estudio y obtener métricas
        </Text>
      </View>

      {/* Modal de Alertas */}
      <Modal
        visible={showAlertModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAlertModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.alertModalContent]}>
            <Text style={styles.modalTitle}>⚠️ Alerta Importante</Text>
            {alerts.map(alert => (
              <View key={alert.id} style={styles.alertItem}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles[`alertPriority${alert.priority}`]}>
                  Prioridad: {alert.priority === 'high' ? 'Alta' : alert.priority === 'medium' ? 'Media' : 'Baja'}
                </Text>
              </View>
            ))}
            <TouchableOpacity 
              style={[styles.closeButton, styles.alertCloseButton]}
              onPress={() => setShowAlertModal(false)}
            >
              <Text style={styles.closeButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;