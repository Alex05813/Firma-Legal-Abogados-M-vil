import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TaskService } from './TaskService';

type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoDetalleTareaScreen'>;

interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  hora_inicio?: string;
  hora_fin?: string;
  todo_el_dia?: boolean;
  vincular_expediente?: boolean;
  asociar_directorios?: boolean;
  asignado_a?: string;
  creado_por?: string;
}

const AbogadoDetalleTareaScreen = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const route = useRoute();
  const { tarea } = route.params as { tarea: Tarea };
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formattedDate = new Date(tarea.fecha).toLocaleDateString('es-ES');

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await TaskService.deleteTask(tarea.id_tarea);
      navigation.goBack();
      // Aquí podrías agregar un mensaje de éxito si lo deseas
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      Alert.alert('Error', 'No se pudo eliminar la tarea. Por favor, inténtalo de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    navigation.navigate('AbogadoEditarTareaScreen', { tarea });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Eliminar Tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: handleDelete,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de Tareas</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{tarea.descripcion}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha:</Text>
          <Text style={styles.detailValue}>{formattedDate}</Text>
        </View>
        
        {tarea.hora_inicio && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hora inicio:</Text>
            <Text style={styles.detailValue}>{tarea.hora_inicio}</Text>
          </View>
        )}
        
        {tarea.hora_fin && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hora fin:</Text>
            <Text style={styles.detailValue}>{tarea.hora_fin}</Text>
          </View>
        )}
        
        {tarea.asignado_a && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Asignado a:</Text>
            <Text style={styles.detailValue}>{tarea.asignado_a}</Text>
          </View>
        )}

      </View>
      </View>
      </ScrollView>
      {/* Botones flotantes */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={confirmDelete}
          disabled={isDeleting}
        >
          <Icon name="delete" size={20} color="white" />
          <Text style={styles.actionButtonText}>
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.updateButton]}
          onPress={handleUpdate}
          disabled={isUpdating}
        >
          <Icon name="edit" size={20} color="white" />
          <Text style={styles.actionButtonText}>
            {isUpdating ? 'Actualizando...' : 'Actualizar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Pendiente': return '#ffb74d';
    case 'En progreso': return '#64b5f6';
    case 'Resultado': return '#81c784';
    case 'En revisión': return '#ba68c8';
    default: return '#6b89b3';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    backgroundColor: '#6b89b3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b89b3',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#f5f7fa',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginHorizontal: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  updateButton: {
    backgroundColor: '#6b89b3',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default AbogadoDetalleTareaScreen;