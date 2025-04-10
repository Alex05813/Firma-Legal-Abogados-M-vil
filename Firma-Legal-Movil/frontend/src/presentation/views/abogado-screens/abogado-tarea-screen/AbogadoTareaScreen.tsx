import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StatusTabs from '../../../components/AbogadoStatusCard';
import NoteCard from '../../../components/AbogadoNoteform';
import { RootStackParamList } from '../../../../../App';

type NotesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoTareaScreen'>;

const AbogadoTareaScreen = () => {
  const navigation = useNavigation<NotesScreenNavigationProp>();
  
  const [activeTab, setActiveTab] = useState('Pendiente');
  const [notes, setNotes] = useState([
    {
      id: '12',
      date: '28/03/2025',
      status: 'Pendiente',
      content: 'Revisar documentación del nuevo proyecto de desarrollo',
    },
    {
      id: '13',
      date: '29/03/2025',
      status: 'En progreso',
      content: 'Diseñar interfaz de usuario para el módulo de reportes',
    },
    {
      id: '14',
      date: '30/03/2025',
      status: 'Resultado',
      content: 'Presentación de resultados al equipo directivo',
    },
  ]);

  const filteredNotes = notes.filter(note => note.status === activeTab);

//   Mirar nueva tarea
  const handleNewNote = () => {
    navigation.navigate('AbogadoNuevaTareaScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6b89b3" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Tareas</Text>
        <Text style={styles.headerSubtitle}>Gestiona tus actividades diarias</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>¿Qué tarea estás buscando?</Text>
      </View>
      
      <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => <NoteCard note={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity style={styles.newButton} onPress={handleNewNote}>
        <Text style={styles.newButtonText}>+ Nueva Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6b89b3',
    marginBottom: 4,
  },
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
});

export default AbogadoTareaScreen;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import StatusTabs from '../components/StatusTabs';
// import NoteCard from '../components/NoteCard';
// import { RootStackParamList } from '../../App';

// type NotesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Notes'>;

// const NotesScreen = () => {

//   const navigation = useNavigation<NotesScreenNavigationProp>();
  
//   const [activeTab, setActiveTab] = useState('Pendiente');
//   const [notes, setNotes] = useState([
//     {
//       id: '12',
//       date: '28/03/2025',
//       status: 'Pendiente',
//       content: 'Nota numero 12',
//     },
//     // Puedes agregar más notas aquí
//   ]);

//   const filteredNotes = notes.filter(note => note.status === activeTab);

//   const handleNewNote = () => {
//     navigation.navigate('NoteForm');
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Volver</Text>
//       <Text style={styles.subtitle}>Tareas</Text>
//       <Text style={styles.searchText}>¿Qué tarea estas buscando?</Text>
      
//       <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
//       <FlatList
//         data={filteredNotes}
//         renderItem={({ item }) => <NoteCard note={item} />}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
      
//       <TouchableOpacity style={styles.newButton} onPress={handleNewNote}>
//         <Text style={styles.newButtonText}>NUEVO</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 16,
//   },
//   searchText: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 24,
//   },
//   listContainer: {
//     paddingBottom: 80,
//   },
//   newButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#1E88E5',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 24,
//     elevation: 3,
//   },
//   newButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default NotesScreen;