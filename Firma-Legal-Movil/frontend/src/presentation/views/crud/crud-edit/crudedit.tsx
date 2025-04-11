import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';


const crudedit   = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
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
          value="12345"
          editable={false}
        />

        {/* Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value="01/01/2023"
        />

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value="10:00"
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
          value="1001"
          keyboardType="numeric"
        />

        {/* Descripción */}
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value="Reunión para revisar documentos legales."
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