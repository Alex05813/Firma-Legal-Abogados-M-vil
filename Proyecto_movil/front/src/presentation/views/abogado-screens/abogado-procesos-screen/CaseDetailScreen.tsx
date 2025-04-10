import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProcessService } from './ProcessService';

type CaseDetailScreenRouteProp = RouteProp<RootStackParamList, 'CaseDetailScreen'>;
type CaseDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CaseDetailScreen'>;

interface CaseDetailScreenProps {
  route: CaseDetailScreenRouteProp;
  navigation: CaseDetailScreenNavigationProp;
}

interface ProcessDetail {
  id_proceso: number;
  descripcion: string;
  numeroIdentificacionCliente: string;
  numeroIdentificacionAbogado: string;
  estado: string;
  fecha_inicio: string;
  id_tipo: number;
  id_subproceso?: number;
  id_docesp?: number;
  // Agrega otros campos según tu modelo
}

const CaseDetailScreen: React.FC<CaseDetailScreenProps> = ({ route, navigation }) => {
  const { caseId } = route.params;
  const [process, setProcess] = useState<ProcessDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcessDetails = async () => {
      try {
        const id = parseInt(caseId, 10);
        const data = await ProcessService.getProcessById(id);
        setProcess(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading process details:', error);
        setLoading(false);
        Alert.alert('Error', 'No se pudo cargar la información del proceso');
      }
    };

    fetchProcessDetails();
  }, [caseId]);

  const handleUpdateProcess = async () => {
    if (!process) return;
    
    try {
      // Aquí puedes implementar la lógica para actualizar el proceso
      // Por ejemplo, podrías abrir un modal o navegar a una pantalla de edición
      Alert.alert('Actualizar', 'Implementa la lógica de actualización aquí');
    } catch (error) {
      console.error('Error updating process:', error);
      Alert.alert('Error', 'No se pudo actualizar el proceso');
    }
  };

  const getPriorityColor = () => '#6b89b3';

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'activo': return '#48dbfb';
      case 'inactivo': return '#ff9ff3';
      default: return '#6b89b3';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles del proceso...</Text>
      </View>
    );
  }

  if (!process) {
    return (
      <View style={styles.container}>
        <Text>No se encontró información del proceso</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6b89b3" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Proceso</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Encabezado del caso */}
        <View style={styles.caseHeader}>
          <View style={styles.caseIdContainer}>
            <Text style={styles.caseId}>Proceso #{process.id_proceso}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
              <Text style={styles.priorityText}>Normal</Text>
            </View>
          </View>
          <Text style={styles.caseTitle}>{process.descripcion}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(process.estado) }]}>
            <Text style={styles.statusText}>{process.estado}</Text>
          </View>
        </View>

        {/* Información básica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Proceso</Text>
          <DetailRow icon="person" title="ID Cliente" value={process.numeroIdentificacionCliente} />
          <DetailRow icon="person" title="ID Abogado" value={process.numeroIdentificacionAbogado} />
          <DetailRow icon="event" title="Fecha Inicio" value={new Date(process.fecha_inicio).toLocaleDateString()} />
          <DetailRow icon="category" title="Tipo" value={`${process.id_tipo}`} />
          {process.id_subproceso && (
            <DetailRow icon="list" title="Subproceso" value={`${process.id_subproceso}`} />
          )}
          {process.id_docesp && (
            <DetailRow icon="description" title="Doc. Especial" value={`${process.id_docesp}`} />
          )}
        </View>

        {/* Descripción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>{process.descripcion}</Text>
        </View>
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={handleUpdateProcess}
        >
          <Icon name="edit" size={20} color="#6b89b3" />
          <Text style={[styles.buttonText, { color: '#6b89b3' }]}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Componente auxiliar para filas de detalle
const DetailRow = ({ icon, title, value }: { icon: string, title: string, value: string }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} size={20} color="#6b89b3" style={styles.detailIcon} />
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  caseHeader: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  caseIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseId: {
    fontSize: 16,
    color: '#6b89b3',
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  caseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    lineHeight: 26,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b89b3',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  documentIcon: {
    marginRight: 12,
  },
  documentName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskCheckbox: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#6b89b3',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6b89b3',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CaseDetailScreen;