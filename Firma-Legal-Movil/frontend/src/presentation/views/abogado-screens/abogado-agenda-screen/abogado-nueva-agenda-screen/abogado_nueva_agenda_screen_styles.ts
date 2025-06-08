import { StyleSheet } from "react-native";

// Estilos
export const AbogadoNuevaAgendaScreen = StyleSheet.create({
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
      marginTop: 40,
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
      marginTop: 10,
      marginBottom: 50,
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
      color: '#FFFFFF',
    },
    buttonTextdos: {
      fontSize: 16,
      fontWeight: '600',
      color: 'black',
    },
     datePickerButton: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
    // Texto dentro del botón del DateTimePicker
  datePickerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  }, // Estilo para el placeholder cuando no hay fecha seleccionada
  placeholderText: {
    color: '#999',
    fontStyle: 'italic',
  },
  
  // Opcional: contenedor adicional para el picker
  datePickerContainer: {
    marginBottom: 15,
  },
  });