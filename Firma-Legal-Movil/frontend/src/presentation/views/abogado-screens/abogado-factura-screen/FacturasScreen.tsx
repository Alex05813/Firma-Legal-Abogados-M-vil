import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { getBaseUrl } from '../../../../domain/services/getBaseUrl';

type FacturasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FacturasScreen'>;

interface Factura {
  id_factura: number;
  monto: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  estado: string;
  metodo_pago: string;
  id_proceso: number;
}

interface ProcesoAsociado {
  id_proceso: number;
  descripcion: string;
}

const baseUrl = getBaseUrl();
const API_URL = 'http://192.168.1.34:9000/api/facturas';

const FacturasScreen = () => {
  const navigation = useNavigation<FacturasScreenNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [filteredFacturas, setFilteredFacturas] = useState<Factura[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [procesosAsociados, setProcesosAsociados] = useState<Record<number, ProcesoAsociado>>({});

  const filters = ['Todas', 'sin cancelar', 'cancelada'];
  const metodosPago = ['Todos', 'efectivo', 'credito', 'transferencia'];
  const [activeMetodoPago, setActiveMetodoPago] = useState('Todos');

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get(`${baseUrl}/facturas`);
        setFacturas(response.data);
        setFilteredFacturas(response.data);
        
        // Obtener información de procesos asociados
        const procesos: Record<number, ProcesoAsociado> = {};
        for (const factura of response.data) {
          try {
            const procesoResponse = await axios.get(`${baseUrl}/procesos/${factura.id_proceso}`);
            procesos[factura.id_proceso] = {
              id_proceso: factura.id_proceso,
              descripcion: procesoResponse.data.descripcion
            };
          } catch (error) {
            console.error(`Error obteniendo proceso ${factura.id_proceso}:`, error);
            procesos[factura.id_proceso] = {
              id_proceso: factura.id_proceso,
              descripcion: 'Proceso no encontrado'
            };
          }
        }
        setProcesosAsociados(procesos);
        setLoading(false);
      } catch (error) {
        console.error('Error loading facturas:', error);
        setLoading(false);
      }
    };

    fetchFacturas();
  }, []);

  useEffect(() => {
    // Aplicar filtros y búsqueda
    let result = facturas;
    
    // Filtrar por estado
    if (activeFilter !== 'Todas') {
      result = result.filter(f => f.estado === activeFilter);
    }
    
    // Filtrar por método de pago
    if (activeMetodoPago !== 'Todos') {
      result = result.filter(f => f.metodo_pago === activeMetodoPago);
    }
    
    // Filtrar por búsqueda
    if (searchQuery) {
      result = result.filter(f => {
        const procesoDesc = procesosAsociados[f.id_proceso]?.descripcion || '';
        
        return (
          f.id_factura.toString().includes(searchQuery) ||
          f.id_proceso.toString().includes(searchQuery) ||
          procesoDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.monto.includes(searchQuery)
        );
      });
    }
    
    setFilteredFacturas(result);
  }, [activeFilter, activeMetodoPago, searchQuery, facturas, procesosAsociados]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'cancelada': return '#48dbfb';
      case 'sin cancelar': return '#ff9ff3';
      default: return '#6b89b3';
    }
  };

  const getMetodoPagoIcon = (metodo: string) => {
    switch(metodo) {
      case 'efectivo': return 'attach-money';
      case 'credito': return 'credit-card';
      case 'transferencia': return 'account-balance';
      default: return 'payment';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <View style={styles.container}>
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
        <Text style={styles.headerTitle}>Gestión de Facturas</Text>
        <View style={{ width: 24 }} />
      </View>
    
      <View style={styles.container1}>  
        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por ID, proceso, monto..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* Filtros rápidos */}
        <View style={styles.filterRow}>
          <Text style={styles.filterTitle}>Estado:</Text>
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
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterTitle}>Método de pago:</Text>
          <View style={styles.filterContainer}>
            {metodosPago.map(metodo => (
              <TouchableOpacity
                key={metodo}
                style={[
                  styles.filterButton,
                  activeMetodoPago === metodo && styles.activeFilterButton
                ]}
                onPress={() => setActiveMetodoPago(metodo)}
              >
                <Text style={[
                  styles.filterText,
                  activeMetodoPago === metodo && styles.activeFilterText
                ]}>
                  {metodo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Estadísticas rápidas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{facturas.length}</Text>
            <Text style={styles.statLabel}>Total facturas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{facturas.filter(f => f.estado === 'sin cancelar').length}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{facturas.filter(f => f.estado === 'cancelada').length}</Text>
            <Text style={styles.statLabel}>Canceladas</Text>
          </View>
        </View>
        
        {/* Lista de facturas */}
        <FlatList
          data={filteredFacturas}
          renderItem={({ item }) => (
            <View style={styles.facturaCard}>
              <View style={styles.facturaHeader}>
                <Text style={styles.facturaId}>Factura #{item.id_factura}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.estado) }
                ]}>
                  <Text style={styles.statusText}>{item.estado}</Text>
                </View>
              </View>
              
              <View style={styles.facturaInfoRow}>
                <Icon name="description" size={18} color="#6b89b3" />
                <Text style={styles.facturaText}>
                  Proceso #{item.id_proceso}: {procesosAsociados[item.id_proceso]?.descripcion || 'Cargando...'}
                </Text>
              </View>

              <View style={styles.facturaInfoRow}>
                <Icon name={getMetodoPagoIcon(item.metodo_pago)} size={18} color="#6b89b3" />
                <Text style={styles.facturaText}>{item.metodo_pago}</Text>
                <Icon name="monetization-on" size={18} color="#6b89b3" style={styles.iconSpacing} />
                <Text style={styles.facturaText}>${item.monto}</Text>
              </View>

              <View style={styles.facturaDates}>
                <View style={styles.facturaDateItem}>
                  <Icon name="event" size={16} color="#888" />
                  <Text style={styles.facturaDateText}>Emisión: {formatDate(item.fecha_emision)}</Text>
                </View>
                <View style={styles.facturaDateItem}>
                  <Icon name="event-busy" size={16} color="#888" />
                  <Text style={styles.facturaDateText}>Vence: {formatDate(item.fecha_vencimiento)}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id_factura.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="receipt" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No se encontraron facturas</Text>
            </View>
          }
        />
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterRow: {
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e0e6f0',
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterButton: {
    backgroundColor: '#6b89b3',
  },
  filterText: {
    color: '#6b89b3',
    fontSize: 12,
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
    fontSize: 20,
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
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  facturaCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  facturaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  facturaId: {
    fontSize: 16,
    color: '#6b89b3',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  facturaInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  facturaText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  iconSpacing: {
    marginLeft: 16,
  },
  facturaDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  facturaDateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facturaDateText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
});

export default FacturasScreen;