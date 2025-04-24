import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StatusTabs from '../../../components/AbogadoStatusCard';
import NoteCard from '../../../components/AbogadoNoteform';
import { RootStackParamList } from '../../../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TaskService } from './TaskService';

type NotesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoTareaScreen'>;

// Agrega esta interfaz al inicio del archivo
interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  hora_inicio?: string;
  hora_fin?: string;
  todo_el_dia?: boolean;
  // Agrega otros campos según necesites
}

const AbogadoTareaScreen = () => {
  const navigation = useNavigation<NotesScreenNavigationProp>();
  
  const [activeTab, setActiveTab] = useState('Pendiente');
  // const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Función para cargar tareas
  const loadTasks = async () => {
    try {
      const tasks = await TaskService.getAllTasks({ estado: activeTab });
      console.log('Tareas recibidas:', tasks);
      setNotes(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Cargar tareas al montar el componente o cambiar pestaña
  useEffect(() => {
    setLoading(true);
    loadTasks();
  }, [activeTab]);

  // Manejar el refresh
  const handleRefresh = () => {
    setRefreshing(true);
    loadTasks();
  };

  // Manejar nueva tarea
  const handleNewNote = () => {
    navigation.navigate('AbogadoNuevaTareaScreen');
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6b89b3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6b89b3" barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
          <Text style={styles.headerTitle}>Tareas</Text>
          <View style={{ width: 24 }} />
      </View>

      <View style={styles.container1}>
      
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>¿Qué tarea estás buscando?</Text>
      </View>
      
      <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteCard note={item} />}
        keyExtractor={item => item.id_tarea.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay tareas {activeTab.toLowerCase()}</Text>
          </View>
        }
      />
      
      <TouchableOpacity style={styles.newButton} onPress={handleNewNote}>
        <Text style={styles.newButtonText}>+ Nueva Tarea</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container1: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },

  header: {
    backgroundColor: '#6b89b3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },



  // header: {
  //   marginBottom: 24,
  // },
  // headerTitle: {
  //   fontSize: 28,
  //   fontWeight: '700',
  //   color: '#6b89b3',
  //   marginBottom: 4,
  // },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchText: {
    fontSize: 16,
    color: '#6b89b3',
    fontStyle: 'italic',
  },
  listContainer: {
    paddingBottom: 100,
  },
  newButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#6b89b3',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#6b89b3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  newButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default AbogadoTareaScreen;