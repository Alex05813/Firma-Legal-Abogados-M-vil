import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../App'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'


// Define el tipo para los parámetros
type CrudEditRouteProp = RouteProp<RootStackParamList, 'crudedit'>;

const crudedit = ({ route }: { route: CrudEditRouteProp }) => {

  const [procesos, setProcesos] = useState('')

  const { agendaData } = route.params;

    type NavigationProps = StackNavigationProp<RootStackParamList, 'crudedit'>;
  const navigation = useNavigation<NavigationProps>();

  const lista_procesos = async () => {
    try {
      const process = await axios.get('http://192.168.1.39:9000/api/procesos')
      setProcesos(process.data)
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Editar Cita</Text>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Formulario */}
      <ScrollView contentContainerStyle={styles.formContainer}>

        {/* ID Agenda (solo lectura) */}
        <Text style={styles.label}>ID Agenda</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={agendaData.id_agenda.toString()}
          editable={false}
        />

        {/* Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={agendaData.fecha}
        />

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={agendaData.hora}
        />

        {/* Estado (simulado con botones) */}
        <Text style={styles.label}>Estado</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity style={[styles.radioButton, styles.radioButtonSelected]}>
            <Text style={styles.radioButtonTextSelected}>Programada</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton}>
            <Text style={styles.radioButtonText}>Cancelada</Text>
          </TouchableOpacity>
        </View>

        {/* ID Proceso */}
        <Text style={styles.label}>ID Proceso</Text>
        <TextInput
          style={styles.input}
          value={agendaData.id_proceso}
          keyboardType="numeric"
        />

        {/* Descripción */}
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={agendaData.descripcion}
        />

        {/* Botones */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos (puros, sin lógica)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2563EB',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 20,
    color: 'white',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  disabledInput: {
    backgroundColor: '#E5E7EB',
    color: '#6B7280',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  radioButtonSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  radioButtonText: {
    color: '#6B7280',
  },
  radioButtonTextSelected: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 16,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  saveButton: {
    backgroundColor: '#2563EB',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default crudedit ;