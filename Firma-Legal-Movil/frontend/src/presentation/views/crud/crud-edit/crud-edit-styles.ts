import { StyleSheet } from "react-native";

// Estilos (puros, sin lógica)
export const crud_styles = StyleSheet.create({
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