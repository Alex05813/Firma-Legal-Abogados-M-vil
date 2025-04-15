import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'
import { getBaseUrl } from '../../../../../domain/services/getBaseUrl';


const AbogadoNuevaAgendaScreen = () => {

  type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoNuevaAgendaScreen'>;
        const navigation = useNavigation<NavigationProps>();

  const [form, setForm] = useState({
    id_agenda: '',
    fecha: '',
    hora: '',
    descripcion: '',
    estado: 'Programada',
    proceso: '',
    id_proceso:'',
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Cita guardada:', form);
    navigation.goBack();
  };

  const insertar_cita = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!form.id_agenda || !form.fecha || !form.hora || !form.descripcion || !form.id_proceso) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }
      
      // Convertir la fecha ingresada al formato ISO 8601
    const [day, month, year] = form.fecha.split('/'); // Dividimos la fecha en día, mes y año
    const fechaISO = new Date(`${year}-${month}-${day}T${form.hora}`).toISOString(); // Construimos la fecha en formato ISO
    if (isNaN(Date.parse(fechaISO))) {
      Alert.alert('Error', 'La fecha ingresada no es válida.');
      return;
    }


      // Crear el objeto para enviar al backend
      const nuevaCita = {
        id_agenda: parseInt(form.id_agenda), // Convertimos a número
        fecha: fechaISO,
        hora: form.hora,
        descripcion: form.descripcion,
        estado: form.estado.toLowerCase(), // Convertimos a minúsculas
        id_proceso: parseInt(form.id_proceso), // Convertimos a número
      };

      // Realizar la solicitud POST
      const baseUrl = getBaseUrl();
      const response = await axios.post(`${baseUrl}/agendas`, nuevaCita);

      // Mostrar mensaje de éxito
      Alert.alert('Éxito', 'La cita se ha guardado correctamente.');
      navigation.goBack(); // Volver a la pantalla anterior
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al guardar la cita.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Agregar Nueva Cita</Text>

      {/* Formulario */}

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID Agenda *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3"
          value={form.id_agenda}
          onChangeText={(text) => handleChange('id_agenda', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 15/05/2024"
          value={form.fecha}
          onChangeText={(text) => handleChange('fecha', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Hora *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 14:30"
          value={form.hora}
          onChangeText={(text) => handleChange('hora', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Detalles de la cita..."
          value={form.descripcion}
          onChangeText={(text) => handleChange('descripcion', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Estado</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.estado}
            onValueChange={(value) => handleChange('estado', value)}
          >
            <Picker.Item label="Programada" value="Programada" />
            <Picker.Item label="Cancelada" value="Cancelada" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID Proceso *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 1"
          value={form.id_proceso}
          onChangeText={(text) => handleChange('id_proceso', text)}
          keyboardType="numeric"
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={insertar_cita} // Llamamos a insertar_cita
        >
          <Text style={styles.buttonText}>Guardar Cita</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E3A8A',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#1E3A8A',
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AbogadoNuevaAgendaScreen;