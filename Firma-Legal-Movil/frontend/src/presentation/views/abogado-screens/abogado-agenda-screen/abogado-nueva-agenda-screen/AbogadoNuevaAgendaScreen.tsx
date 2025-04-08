import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AbogadoNuevaAgendaScreen'>;
};

const AbogadoNuevaAgendaScreen = ({ navigation }: Props) => {
  const [form, setForm] = useState({
    fecha: '',
    hora: '',
    descripcion: '',
    estado: 'Programada',
    proceso: ''
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Cita guardada:', form);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Agregar Nueva Cita</Text>

      {/* Formulario */}
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
        <Text style={styles.label}>Proceso Asociado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Caso Laboral #123"
          value={form.proceso}
          onChangeText={(text) => handleChange('proceso', text)}
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
          onPress={handleSubmit}
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