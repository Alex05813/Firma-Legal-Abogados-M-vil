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

interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}

interface UserProfile {
  name: string;
  imageUri: any;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

interface AlertItem {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

interface FileData {
  name: string;
  size: number;
  uri: string;
  mimeType: string;
}

type AbogadoPrincipalRouteProp = RouteProp<RootStackParamList, 'AbogadoPrincipalScreen'>;

const HomeScreen: React.FC = () => {
  const route = useRoute<AbogadoPrincipalRouteProp>();
  const { numIdentificacion } = route.params; // Extrae el parámetro
  
  type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoPrincipalScreen'>;
          const navigation = useNavigation<NavigationProps>();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Bill Gates',
    imageUri: require('../../../../../assets/billgates.jpg'),
  });

  const [stats, setStats] = useState<CheckboxItem[]>([
    { id: '1', label: '0 Procesos totales', checked: false },
    { id: '2', label: '0 Documentos guardados', checked: true },
    { id: '3', label: '0 Usuarios en la firma', checked: false },
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, imageUri: { uri: result.assets[0].uri } });
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, imageUri: { uri: result.assets[0].uri } });
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
            <Text style={styles.subtitle}>Este es un resumen de tu actividad</Text>
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
            <TouchableOpacity style={styles.menuItem}>
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
          <Text style={styles.capsuleTitle}>📌 Agendamiento</Text>
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
      <View style={styles.section}>
        <Text style={styles.infoText}>
          Carga expedientes y sigue utilizando LAO para nutrir de información tu estudio y obtener métricas
        </Text>
      </View>

      {/* Modal de Tareas
      <Modal
        visible={showTaskModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTaskModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📌 Tarea Pendiente</Text>
            {tasks.map(task => (
              <View key={task.id} style={styles.taskItem}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <Text style={styles.taskDueDate}>Fecha límite: {task.dueDate}</Text>
              </View>
            ))}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowTaskModal(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

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