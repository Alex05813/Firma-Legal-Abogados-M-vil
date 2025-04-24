import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';

type CasesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoProcesosScreen'>;

const AbogadoProcesosScreen = () => {
  const navigation = useNavigation<CasesScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  // Datos de ejemplo de casos legales
  const [cases, setCases] = useState([
    {
      id: 'C-001',
      title: 'Contrato de arrendamiento',
      client: 'María Rodríguez',
      status: 'En progreso',
      lastUpdate: '15/04/2025',
      nextHearing: '22/04/2025',
      category: 'Civil',
      priority: 'Alta',
    },
    {
      id: 'C-002',
      title: 'Demanda laboral',
      client: 'Empresa XYZ S.A.',
      status: 'Pendiente',
      lastUpdate: '10/04/2025',
      nextHearing: '30/04/2025',
      category: 'Laboral',
      priority: 'Media',
    },
    {
      id: 'C-003',
      title: 'Divorcio contencioso',
      client: 'Carlos Martínez',
      status: 'En revisión',
      lastUpdate: '05/04/2025',
      nextHearing: '18/04/2025',
      category: 'Familia',
      priority: 'Alta',
    },
    {
      id: 'C-004',
      title: 'Defensa penal',
      client: 'Ana López',
      status: 'Finalizado',
      lastUpdate: '28/03/2025',
      nextHearing: 'N/A',
      category: 'Penal',
      priority: 'Urgente',
    },
  ]);

  const filters = ['Todos', 'Pendiente', 'En progreso', 'En revisión', 'Finalizado'];
  const filteredCases = activeFilter === 'Todos' 
    ? cases 
    : cases.filter(caseItem => caseItem.status === activeFilter);

  const navigateToCaseDetail = (caseId: string) => {
    navigation.navigate('AbogadoProcesosScreen', /*{ caseId }*/);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Alta': return '#ff6b6b';
      case 'Urgente': return '#ff0000';
      case 'Media': return '#feca57';
      default: return '#1dd1a1';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6b89b3" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestión de Casos</Text>
        <Text style={styles.headerSubtitle}>Bienvenido, Dr. Perdomo</Text>
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
          <Text style={styles.statNumber}>{cases.length}</Text>
          <Text style={styles.statLabel}>Casos totales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{cases.filter(c => c.status === 'Pendiente').length}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{cases.filter(c => c.priority === 'Alta' || c.priority === 'Urgente').length}</Text>
          <Text style={styles.statLabel}>Prioritarios</Text>
        </View>
      </View>
      
      {/* Lista de casos */}
      <FlatList
        data={filteredCases}
        renderItem={({ item }) => (
            
          <TouchableOpacity 
            style={styles.caseCard}
            onPress={() => navigateToCaseDetail(item.id)}
          >
            <View style={styles.caseHeader}>
              <Text style={styles.caseId}>{item.id}</Text>
              <View style={[
                styles.priorityBadge, 
                { backgroundColor: getPriorityColor(item.priority) }
              ]}>
                <Text style={styles.priorityText}>{item.priority}</Text>
              </View>
            </View>
            
            <Text style={styles.caseTitle}>{item.title}</Text>
            <Text style={styles.caseClient}>Cliente: {item.client}</Text>
            
            <View style={styles.caseFooter}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.status) }
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
              
              <View style={styles.caseDates}>
                <Text style={styles.caseDate}>Últ. act: {item.lastUpdate}</Text>
                <Text style={styles.caseDate}>Próxima audiencia: {item.nextHearing}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Botón de acción flotante */}
      <TouchableOpacity style={styles.fab} /*onPress={() => navigation.navigate('NewCase')}*/>
        <Text style={styles.fabText}>+ Nuevo caso</Text>
      </TouchableOpacity>
    </View>
  );
};

// Función auxiliar para colores de estado
const getStatusColor = (status: string) => {
  switch(status) {
    case 'Pendiente': return '#ff9ff3';
    case 'En progreso': return '#48dbfb';
    case 'En revisión': return '#feca57';
    case 'Finalizado': return '#1dd1a1';
    default: return '#6b89b3';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  header: {
    marginBottom: 20,
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
    fontSize: 14,
    color: '#6b89b3',
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  caseClient: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  caseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default AbogadoProcesosScreen;