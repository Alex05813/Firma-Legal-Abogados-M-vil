import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { TaskService } from './TaskService';
import NoteForm from '../../../components/AbogadoNoteFormEdit';

type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoEditarTareaScreen'>;

interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  hora_inicio?: string;
  hora_fin?: string;
  todo_el_dia?: boolean;
  vincular_expediente?: boolean;
  asociar_directorios?: boolean;
  asignado_a?: string;
  creado_por?: string;
}

const AbogadoEditarTareaScreen = () => {
  const navigation = useNavigation<EditScreenNavigationProp>();
  const route = useRoute();
  const { tarea } = route.params as { tarea: Tarea };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (taskData: { 
    title: string; 
    description: string;
    allDay?: boolean;
    linkFile?: boolean;
    associateDirectories?: boolean;
    assignee?: string;
    status?: string; // Nuevo campo para el estado
  }) => {
    setIsSubmitting(true);
    try {
      const updatedTask = {
        titulo: taskData.title,
        descripcion: taskData.description,
        estado: taskData.status || tarea.estado, // Incluir el estado
        todo_el_dia: taskData.allDay,
        vincular_expediente: taskData.linkFile,
        asociar_directorios: taskData.associateDirectories,
        asignado_a: taskData.assignee,
      };

      await TaskService.updateTask(tarea.id_tarea, updatedTask);
      navigation.navigate('AbogadoDetalleTareaScreen', { 
        tarea: {
          ...tarea,
          ...updatedTask
        }
      });
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      Alert.alert('Error', 'No se pudo actualizar la tarea. Por favor, inténtalo de nuevo.');
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
        isEditMode={true}
        showStatusSelector={true}
        initialStatus={tarea.estado}
        initialData={{
          title: tarea.titulo,
          description: tarea.descripcion,
          allDay: tarea.todo_el_dia,
          linkFile: tarea.vincular_expediente,
          associateDirectories: tarea.asociar_directorios,
          assignee: tarea.asignado_a
        }}
      />
    </View>
  );
};

export default AbogadoEditarTareaScreen;