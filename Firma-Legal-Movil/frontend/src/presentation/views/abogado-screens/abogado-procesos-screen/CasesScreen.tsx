import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { ProcessService } from './ProcessService';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CasesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CasesScreen'>;

interface Process {
  id_proceso: number;
  descripcion: string;
  numeroIdentificacionCliente: string | {
    nombre?: string;
    apellido?: string;
  };
  estado: string;
  fecha_inicio: string;
}

// Función para obtener el nombre completo (añade esto en el componente)
const getFullName = (person: any) => {
  if (typeof person === 'string') return person;
  return `${person?.nombre || ''} ${person?.apellido || ''}`.trim() || 'Cliente no especificado';
};

const CasesScreen = () => {
  const navigation = useNavigation<CasesScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [processes, setProcesses] = useState<Process[]>([]);
  const [filteredProcesses, setFilteredProcesses] = useState<Process[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const filters = ['Todos', 'activo', 'inactivo'];

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const data = await ProcessService.getAllProcesses();
        setProcesses(data);
        setFilteredProcesses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading processes:', error);
        setLoading(false);
      }
    };

    fetchProcesses();
  }, []);

  useEffect(() => {
    // Aplicar filtros y búsqueda
    let result = processes;
    
    // Filtrar por estado
    if (activeFilter !== 'Todos') {
      result = result.filter(p => p.estado === activeFilter);
    }
    
    // Filtrar por búsqueda
    if (searchQuery) {
      result = result.filter(p => {
        const clientId = typeof p.numeroIdentificacionCliente === 'string' 
          ? p.numeroIdentificacionCliente
          : '';
        
        return (
          p.id_proceso.toString().includes(searchQuery) ||
          clientId.includes(searchQuery) ||
          p.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
    // if (searchQuery) {
    //   result = result.filter(p => 
    //     p.id_proceso.toString().includes(searchQuery) ||
    //     p.numeroIdentificacionCliente.includes(searchQuery) ||
    //     p.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }
    
    setFilteredProcesses(result);
  }, [activeFilter, searchQuery, processes]);

  const navigateToCaseDetail = (id_proceso: number) => {
    navigation.navigate('CaseDetailScreen', { caseId: id_proceso.toString() });
  };

  const getPriorityColor = () => '#6b89b3'; // Puedes ajustar esto según tus necesidades

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'activo': return '#48dbfb';
      case 'inactivo': return '#ff9ff3';
      default: return '#6b89b3';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando procesos...</Text>
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
            <Text style={styles.headerTitle}>Gestion de Procesos</Text>
            <View style={{ width: 24 }} />
        </View>
    
    <View style={styles.container1}>  
      
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestión de Casos</Text>
        <Text style={styles.headerSubtitle}>Bienvenido, Dr. Perdomo</Text>
      </View> */}
      
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por ID, cliente o descripción"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {/* Filtros rápidos */}
      <View style={styles.filterContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Estadísticas rápidas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{processes.length}</Text>
          <Text style={styles.statLabel}>Procesos totales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{processes.filter(p => p.estado === 'activo').length}</Text>
          <Text style={styles.statLabel}>Activos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{processes.filter(p => p.estado === 'inactivo').length}</Text>
          <Text style={styles.statLabel}>Inactivos</Text>
        </View>
      </View>
      
      {/* Lista de casos */}
      <FlatList
        data={filteredProcesses}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.caseCard}
            onPress={() => navigateToCaseDetail(item.id_proceso)}
          >
            <View style={styles.caseHeader}>
              <Text style={styles.caseId}>Proceso #{item.id_proceso}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.estado) }
            ]}>
                <Text style={styles.statusText}>{item.estado}</Text>
              </View>
            </View>
            
            <Text style={styles.caseClient}>{getFullName(item.descripcion)}</Text>
            
            {/* <View style={styles.caseFooter}>
              <Text style={styles.caseDate}>Inicio: {new Date(item.fecha_inicio).toLocaleDateString()}</Text>
            </View> */}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id_proceso.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  retryButton: {
    backgroundColor: '#6b89b3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container1: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e6f0',
    marginBottom: 8,
  },
  activeFilterButton: {
    backgroundColor: '#6b89b3',
  },
  filterText: {
    color: '#6b89b3',
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6b89b3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 100,
  },
  caseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caseId: {
    fontSize: 16,
    color: '#6b89b3',
    fontWeight: '600',
  },
  // priorityBadge: {
  //   paddingHorizontal: 10,
  //   paddingVertical: 4,
  //   borderRadius: 12,
  // },
  // priorityText: {
  //   fontSize: 12,
  //   color: 'white',
  //   fontWeight: '600',
  // },
  // caseTitle: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   color: '#333',
  //   marginBottom: 8,
  // },
  caseClient: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  caseFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  caseDates: {
    alignItems: 'flex-end',
  },
  caseDate: {
    fontSize: 12,
    color: '#888',
  },
  fab: {
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
  fabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  backButtonContainer: {
    position: 'absolute', // Posiciona el botón "Volver" absolutamente
    left: 8,
    top: 8,
    zIndex: 1, // Asegura que esté por encima del título
  },
});

export default CasesScreen;