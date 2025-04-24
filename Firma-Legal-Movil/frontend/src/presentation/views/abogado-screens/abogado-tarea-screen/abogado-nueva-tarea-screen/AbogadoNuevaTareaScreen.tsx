import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';
import { TaskService } from '../TaskService';
import NoteForm from '../../../../components/AbogadoNoteFormPost';

type NoteFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoNuevaTareaScreen'>;

const AbogadoNuevaTareaScreen = () => {
  const navigation = useNavigation<NoteFormScreenNavigationProp>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nextTaskId, setNextTaskId] = useState<number | null>(null);
  const [selectedEstado, setSelectedEstado] = useState('Pendiente');

  // Obtener el próximo ID disponible al cargar el componente
  useEffect(() => {
    const fetchNextTaskId = async () => {
      try {
        const tasks = await TaskService.getAllTasks();
        const maxId = tasks.reduce((max: number, task: any) => 
          Math.max(max, task.id_tarea || 0), 0);
        setNextTaskId(maxId + 1);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setNextTaskId(1); // Valor por defecto si falla
      }
    };
    
    fetchNextTaskId();
  }, []);

  const handleSubmit = async (taskData: { 
    title: string; 
    description: string;
    allDay?: boolean;
    linkFile?: boolean;
    associateDirectories?: boolean;
    assignee?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    status?: string; // Nuevo campo para el estado
  }) => {
    if (!nextTaskId) {
      Alert.alert('Error', 'No se pudo determinar el ID para la nueva tarea');
      return;
    }

    setIsSubmitting(true);
    try {
      const newTask = {
        id_tarea: nextTaskId,
        titulo: taskData.title,
        descripcion: taskData.description,
        fecha: taskData.date ? new Date(taskData.date).toISOString() : new Date().toISOString(),
        hora_inicio: taskData.startTime || '09:00',
        hora_fin: taskData.endTime || '10:00',
        estado: taskData.status || 'Pendiente', // Usar el estado seleccionado
        todo_el_dia: taskData.allDay || false,
        vincular_expediente: taskData.linkFile || false,
        asociar_directorios: taskData.associateDirectories || false,
        asignado_a: taskData.assignee || '',
        creado_por: 1
      };

      const createdTask = await TaskService.createTask(newTask);
      
      navigation.navigate('AbogadoTareaScreen', { 
        refresh: true,
        newTaskId: createdTask.id_tarea 
      });
      
    } catch (error: any) {
      console.error('Error creating task:', error);
      let errorMessage = 'No se pudo crear la tarea. Por favor, inténtalo de nuevo.';
      
      if (error.response?.data?.details) {
        errorMessage += `\n\nErrores:\n${error.response.data.details.join('\n')}`;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <NoteForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        showTimeInputs={true}
        showDateInput={true}
        showStatusSelector={true} // Ahora está definido en la interfaz
        initialStatus={selectedEstado} // Pasa el estado inicial correctamente
      />
    </View>
  );
};

export default AbogadoNuevaTareaScreen;