import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProcessService } from './ProcessService';

type CaseDetailScreenRouteProp = RouteProp<RootStackParamList, 'CaseDetailScreen'>;
type CaseDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CaseDetailScreen'>;

interface ProcessDetail {
  id_proceso: number;
  descripcion: string;
  numeroIdentificacionCliente: string | {
    nombre?: string;
    apellido?: string;
  };
  numeroIdentificacionAbogado: string | {
    nombre?: string;
    apellido?: string;
  };
  estado: string;
  fecha_inicio: string;
  id_tipo: number;
  id_subproceso?: number;
  id_docesp?: number;
}

const CaseDetailScreen: React.FC<{ route: CaseDetailScreenRouteProp, navigation: CaseDetailScreenNavigationProp }> = ({ route, navigation }) => {
  const { caseId } = route.params;
  const [process, setProcess] = useState<ProcessDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// Agregar al useEffect existente
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const id = Number(caseId);
      if (isNaN(id)) throw new Error('ID inválido');

      console.log(`Buscando proceso con ID: ${id}`);
      const data = await ProcessService.getProcessById(id);
      
      if (!data) {
        throw new Error('Proceso no encontrado');
      }

      console.log('Datos recibidos:', data);
      setProcess(data);
    } catch (err) {
      console.error('Error al cargar:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  const unsubscribe = navigation.addListener('focus', fetchData);
  return unsubscribe;
}, [caseId, navigation, route.params?.shouldRefresh]);

  // Función para obtener el nombre completo
  const getFullName = (person: any) => {
    if (typeof person === 'string') return person;
    return `${person?.nombre || ''} ${person?.apellido || ''}`.trim() || 'No especificado';
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Fecha no válida';
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#6b89b3" />
        <Text style={styles.loadingText}>Cargando detalles del proceso...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Icon name="error" size={40} color="#ff6b6b" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
          }}
        >
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!process) {
    return (
      <View style={[styles.container, styles.center]}>
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
        <View style={styles.caseHeader}>
          <View style={styles.caseIdContainer}>
            <Text style={styles.caseId}>Proceso #{process.id_proceso}</Text>
            {process.estado && (
              <View style={[styles.statusBadge, { backgroundColor: process.estado === 'activo' ? '#48dbfb' : '#ff9ff3' }]}>
                <Text style={styles.statusText}>{process.estado.toUpperCase()}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          
          <DetailRow 
            icon="person" 
            title="Cliente" 
            value={getFullName(process.numeroIdentificacionCliente)} 
          />
          
          <DetailRow 
            icon="person" 
            title="Abogado" 
            value={getFullName(process.numeroIdentificacionAbogado)} 
          />
          
          <DetailRow 
            icon="event" 
            title="Fecha Inicio" 
            value={formatDate(process.fecha_inicio)} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {process.descripcion || 'No hay descripción disponible'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('UpdateProcessScreen', { caseId: caseId })}>
          <Icon name="edit" size={20} color="white" />
          <Text style={styles.editButtonText}>Editar Proceso</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Componente auxiliar para filas de detalle
const DetailRow = ({ icon, title, value }: { icon: string, title: string, value: string }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} size={20} color="#6b89b3" style={styles.detailIcon} />
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailValue}>{value || 'No especificado'}</Text>
    </View>
  </View>
);

// Estilos actualizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#6b89b3',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 18,
    marginVertical: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#6b89b3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
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
  caseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  caseType: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
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
  editButton: {
    backgroundColor: '#6b89b3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    margin: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CaseDetailScreen;