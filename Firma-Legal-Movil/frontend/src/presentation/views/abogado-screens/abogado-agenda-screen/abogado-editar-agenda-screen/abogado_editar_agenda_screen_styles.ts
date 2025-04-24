import { StyleSheet } from "react-native";

// Estilos (puros, sin lógica)
export const AbogadoEditarAgendaScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FAFB',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 15,
      overflow: 'hidden', // Importante para bordes redondeados en Android
    },
    picker: {
      width: '100%',
      backgroundColor: '#f9f9f9',
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
    // En tu archivo crud-edit-styles.ts
radioButton: {
  padding: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  marginRight: 10,
},
radioButtonSelected: {
  backgroundColor: '#007AFF', // o tu color azul preferido
  borderColor: '#007AFF',
},
radioButtonText: {
  color: '#000',
},
radioButtonTextSelected: {
  color: '#fff',
},
radioGroup: {
  flexDirection: 'row',
  marginBottom: 15,
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
    dateInputContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 15,
      marginBottom: 15,
    },
    dateText: {
      fontSize: 16,
    },
  });