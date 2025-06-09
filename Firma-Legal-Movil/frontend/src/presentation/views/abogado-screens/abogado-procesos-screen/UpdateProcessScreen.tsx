
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform,  ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProcessService } from './ProcessService';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getBaseUrl } from '../../../../domain/services/getBaseUrl';

type UpdateProcessScreenRouteProp = RouteProp<RootStackParamList, 'UpdateProcessScreen'>;
type UpdateProcessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateProcessScreen'>;

interface ProcessData {
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
  id_tipo?: number;
  id_subproceso?: number | null;
  id_docesp?: number | null;
}

const UpdateProcessScreen: React.FC<{ route: UpdateProcessScreenRouteProp, navigation: UpdateProcessScreenNavigationProp }> = ({ route, navigation }) => {
  const { caseId } = route.params;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processData, setProcessData] = useState<ProcessData | null>(null);

  // Estados para los campos editables
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('activo');
  const [fechaInicio, setFechaInicio] = useState('');
  // const [clienteId, setClienteId] = useState('');
  // const [abogadoId, setAbogadoId] = useState('');
  const [clienteId, setClienteId] = useState<string>('');
  const [abogadoId, setAbogadoId] = useState<string>('');  
  const [tipoProceso, setTipoProceso] = useState<number | undefined>();
  const [subproceso, setSubproceso] = useState<number | undefined>();
  const [docEsp, setDocEsp] = useState<number | undefined>();

  useEffect(() => {
    const fetchProcessDetails = async () => {
      try {
        setLoading(true);
        const id = Number(caseId);
        if (isNaN(id)) {
          throw new Error('ID de proceso inválido');
        }

        const data = await ProcessService.getProcessById(id);
        
        if (!data || !data.id_proceso) {
          throw new Error('Proceso no encontrado');
        }

        if (typeof data.numeroIdentificacionCliente !== 'string' || 
          !/^\d+$/.test(data.numeroIdentificacionCliente)) {
        console.warn('ID de cliente no es numérico');
      }
      if (typeof data.numeroIdentificacionAbogado !== 'string' || 
          !/^\d+$/.test(data.numeroIdentificacionAbogado)) {
        console.warn('ID de abogado no es numérico');
      }
        
        setProcessData(data);
        setDescripcion(data.descripcion);
        setEstado(data.estado);
        setFechaInicio(data.fecha_inicio.split('T')[0]); // Formato YYYY-MM-DD
        setClienteId(typeof data.numeroIdentificacionCliente === 'string' ? data.numeroIdentificacionCliente : '');
        setAbogadoId(typeof data.numeroIdentificacionAbogado === 'string' ? data.numeroIdentificacionAbogado : '');
        setTipoProceso(data.id_tipo);
        setSubproceso(data.id_subproceso);
        setDocEsp(data.id_docesp);
      } catch (err) {
        console.error('Error loading process details:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProcessDetails();
  }, [caseId]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
  
      if (!processData) {
        throw new Error('Datos del proceso no disponibles');
      }
  
      // Validaciones
      if (!descripcion.trim()) throw new Error('La descripción es requerida');
      if (!fechaInicio.trim()) throw new Error('La fecha de inicio es requerida');
      if (!clienteId.trim()) throw new Error('El ID del cliente es requerido');
      if (!abogadoId.trim()) throw new Error('El ID del abogado es requerido');
      if (!tipoProceso) throw new Error('El tipo de proceso es requerido');
  
      // Formatear fecha correctamente
      const fecha = new Date(fechaInicio);
      if (isNaN(fecha.getTime())) throw new Error('Fecha de inicio no válida');
      
      // Asegurar que la fecha incluya la zona horaria
      const fechaFormateada = fecha.toISOString();
  
      const updatedData = {
        descripcion: descripcion.trim(),
        estado,
        fecha_inicio: fechaFormateada, // Usamos el formato ISO completo
        numeroIdentificacionCliente: clienteId.trim(),
        numeroIdentificacionAbogado: abogadoId.trim(),
        id_tipo: tipoProceso,
        id_subproceso: subproceso || null,
        id_docesp: docEsp || null
      };
  
      console.log('Datos a enviar:', updatedData);
      const response = await ProcessService.updateProcess(processData.id_proceso, updatedData);
      
      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }
  
      // Navegar de vuelta forzando actualización
      navigation.navigate('CaseDetailScreen', { 
        caseId: caseId,
        shouldRefresh: true 
      });
      
    }  catch (err) {
      console.error('Error al guardar:', err);
      let errorMessage = 'Error desconocido al guardar';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
    }
  };

  const getFullName = (person: any) => {
    if (typeof person === 'string') return person;
    return `${person?.nombre || ''} ${person?.apellido || ''}`.trim() || 'No especificado';
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

  if (!processData) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>No se encontró información del proceso</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 2}
        >
    <View style={styles.container}>
      <StatusBar backgroundColor="#6b89b3" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Proceso #{processData.id_proceso}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Descripción*</Text>
            <TextInput
              style={styles.input}
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="Descripción del proceso"
              multiline
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Estado*</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={estado}
                onValueChange={(itemValue) => setEstado(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Activo" value="activo" />
                <Picker.Item label="Inactivo" value="inactivo" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Fecha de Inicio*</Text>
            <TextInput
              style={styles.input}
              value={fechaInicio}
              onChangeText={setFechaInicio}
              placeholder="YYYY-MM-DD"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Participantes</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>ID Cliente*</Text>
            <TextInput
              style={styles.input}
              value={clienteId}
              onChangeText={setClienteId}
              placeholder="Número de identificación del cliente"
              keyboardType="numeric"
            />
            {typeof processData.numeroIdentificacionCliente !== 'string' && (
              <Text style={styles.infoText}>
                Cliente actual: {getFullName(processData.numeroIdentificacionCliente)}
              </Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>ID Abogado*</Text>
            <TextInput
              style={styles.input}
              value={abogadoId}
              onChangeText={setAbogadoId}
              placeholder="Número de identificación del abogado"
              keyboardType="numeric"
            />
            {typeof processData.numeroIdentificacionAbogado !== 'string' && (
              <Text style={styles.infoText}>
                Abogado actual: {getFullName(processData.numeroIdentificacionAbogado)}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clasificación</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de Proceso*</Text>
            <TextInput
              style={styles.input}
              value={tipoProceso?.toString() || ''}
              onChangeText={(text) => setTipoProceso(text ? Number(text) : undefined)}
              placeholder="ID del tipo de proceso"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Subproceso</Text>
            <TextInput
              style={styles.input}
              value={subproceso?.toString() || ''}
              onChangeText={(text) => setSubproceso(text ? Number(text) : undefined)}
              placeholder="ID del subproceso"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Documento Especial</Text>
            <TextInput
              style={styles.input}
              value={docEsp?.toString() || ''}
              onChangeText={(text) => setDocEsp(text ? Number(text) : undefined)}
              placeholder="ID del documento especial"
              keyboardType="numeric"
            />
          </View>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Icon name="error" size={20} color="#ff6b6b" />
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        {/* AÑADE ESTE BLOQUE JUSTO AQUÍ */}
      {error && (
        <View style={styles.errorDetail}>
          <Text style={styles.errorTitle}>Error:</Text>
          {error.split('\n').map((line, i) => (
            <Text key={i} style={styles.errorText}>
              • {line}
            </Text>
          ))}
        </View>
      )}

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Icon name="save" size={20} color="white" />
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
  );
};

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
    marginTop: StatusBar.currentHeight || 0,
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
    paddingBottom: 40,
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  infoText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeeee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorMessage: {
    color: '#ff6b6b',
    marginLeft: 8,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#6b89b3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorDetail: {
    backgroundColor: '#ffeeee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorTitle: {
    color: '#ff6b6b',
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default UpdateProcessScreen;