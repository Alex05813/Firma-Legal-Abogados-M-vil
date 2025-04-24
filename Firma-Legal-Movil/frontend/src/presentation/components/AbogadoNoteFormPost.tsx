import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Switch,
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar este paquete

interface TimeInputProps {
    value: string;
    onChange: (time: string) => void;
    label: string;
  }
  
  const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, label }) => {
    return (
      <View style={styles.timeInputContainer}>
        <Text style={styles.timeInputLabel}>{label}</Text>
        <TextInput
          style={styles.timeInput}
          value={value}
          onChangeText={onChange}
          placeholder="HH:MM"
          keyboardType="numeric"
        />
      </View>
    );
  };

  interface NoteFormProps {
    onSubmit: (note: { 
      title: string; 
      description: string;
      allDay?: boolean;
      linkFile?: boolean;
      associateDirectories?: boolean;
      assignee?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
      status?: string;
    }) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
    isEditMode?: boolean;
    showTimeInputs?: boolean;
    showDateInput?: boolean;
    showStatusSelector?: boolean;
    initialStatus?: string;
    initialData?: {
      title: string;
      description: string;
      allDay?: boolean;
      linkFile?: boolean;
      associateDirectories?: boolean;
      assignee?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
    };
  }

// Luego modifica el componente NoteForm para incluir los nuevos campos
const NoteForm: React.FC<NoteFormProps> = ({ 
    onSubmit, 
    onCancel, 
    isSubmitting,
    isEditMode = false,
    showTimeInputs = false,
    showDateInput = false,
    showStatusSelector = false, // Valor por defecto false
    initialStatus = 'Pendiente', // Maneja el estado inicial aquí
    initialData = {
      title: '',
      description: '',
      allDay: false,
      linkFile: false,
      associateDirectories: false,
      assignee: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
    }
  }) => {
    const [title, setTitle] = useState(initialData.title);
    const [description, setDescription] = useState(initialData.description);
    const [allDay, setAllDay] = useState(initialData.allDay || false);
    const [linkFile, setLinkFile] = useState(initialData.linkFile || false);
    const [associateDirectories, setAssociateDirectories] = useState(initialData.associateDirectories || false);
    const [assignee, setAssignee] = useState(initialData.assignee || '');
    const [date, setDate] = useState(initialData.date ?? new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState(initialData.startTime ?? '09:00');
    const [endTime, setEndTime] = useState(initialData.endTime ?? '10:00');
    const [status, setStatus] = useState(initialStatus);
  
    const handleSubmit = () => {
        onSubmit({
          title,
          description,
          allDay,
          linkFile,
          associateDirectories,
          assignee,
          date: date ?? new Date().toISOString().split('T')[0],
          startTime: startTime ?? '09:00',
          endTime: endTime ?? '10:00',
          status // Añadimos el estado al objeto que se envía
        });
      };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {isEditMode ? 'Editar Tarea' : 'Nueva Tarea'}
        </Text>
        <View style={styles.headerLine} />
      </View>
      
      {/* Sección de información básica */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información de la Tarea</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Título de la tarea"
          value={title}
          onChangeText={setTitle}
        />
        
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {showStatusSelector && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
                dropdownIconColor="#666"
              >
                <Picker.Item label="Pendiente" value="Pendiente" />
                <Picker.Item label="En progreso" value="En progreso" />
                <Picker.Item label="Resultado" value="Resultado" />
                <Picker.Item label="En revisión" value="En revisión" />
              </Picker>
            </View>
          </View>
        )}

      {showDateInput && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha y Hora</Text>
          <TextInput
            style={styles.input}
            placeholder="Fecha (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
          />
          
          {showTimeInputs && !allDay && (
            <View style={styles.timeInputsRow}>
              <TimeInput 
                value={startTime}
                onChange={setStartTime}
                label="Hora inicio"
              />
              <TimeInput 
                value={endTime}
                onChange={setEndTime}
                label="Hora fin"
              />
            </View>
          )}
        </View>
      )}
      
      {/* Sección de opciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opciones</Text>
        
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <Switch
              value={allDay}
              onValueChange={setAllDay}
              thumbColor={allDay ? '#6b89b3' : '#f5f5f5'}
              trackColor={{ false: '#e0e0e0', true: '#a3b8d9' }}
            />
            <Text style={styles.optionLabel}>Todo el día</Text>
          </View>
          
          <View style={styles.option}>
            <Switch
              value={linkFile}
              onValueChange={setLinkFile}
              thumbColor={linkFile ? '#6b89b3' : '#f5f5f5'}
              trackColor={{ false: '#e0e0e0', true: '#a3b8d9' }}
            />
            <Text style={styles.optionLabel}>Vincular a expediente</Text>
          </View>
          
          <View style={styles.option}>
            <Switch
              value={associateDirectories}
              onValueChange={setAssociateDirectories}
              thumbColor={associateDirectories ? '#6b89b3' : '#f5f5f5'}
              trackColor={{ false: '#e0e0e0', true: '#a3b8d9' }}
            />
            <Text style={styles.optionLabel}>Asociar directorios</Text>
          </View>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Asignado a"
          value={assignee}
          onChangeText={setAssignee}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={onCancel}
          disabled={isSubmitting}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.submitButton]} 
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Icon name={isEditMode ? 'save' : 'add'} size={20} color="white" />
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Procesando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#6b89b3',
    marginBottom: 8,
  },
  headerLine: {
    height: 3,
    width: 60,
    backgroundColor: '#6b89b3',
    borderRadius: 3,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 12,
  },
  submitButton: {
    backgroundColor: '#6b89b3',
    shadowColor: '#6b89b3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  timeInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeInputContainer: {
    width: '48%',
  },
  timeInputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default NoteForm;