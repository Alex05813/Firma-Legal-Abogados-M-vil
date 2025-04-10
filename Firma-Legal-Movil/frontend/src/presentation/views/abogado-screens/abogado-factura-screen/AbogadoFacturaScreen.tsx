import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de instalar expo/vector-icons

const FacturasScreen = () => {
  const facturas = [
    {
      id: '1',
      cliente: 'González & Asociados',
      monto: '$2,450.00',
      fechaEmision: '15/03/2024',
      fechaVencimiento: '30/03/2024',
      estado: 'Pagada',
      metodoPago: 'Transferencia',
      icono: 'attach-money'
    },
    {
      id: '2',
      cliente: 'Pérez Consultores Legales',
      monto: '$1,850.50',
      fechaEmision: '10/04/2024',
      fechaVencimiento: '25/04/2024',
      estado: 'Pendiente',
      metodoPago: 'Tarjeta de Crédito',
      icono: 'credit-card'
    }
  ];

  const getEstadoStyle = (estado: string) => ({
    ...styles.estadoBadge,
    backgroundColor: estado === 'Pagada' ? '#ECFDF5' : '#FEF2F2',
    borderColor: estado === 'Pagada' ? '#10B981' : '#EF4444'
  });

  const getEstadoTextStyle = (estado: string) => ({
    color: estado === 'Pagada' ? '#10B981' : '#EF4444'
  });

  return (
    <View style={styles.container}>
      {/* Header Premium */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Gestión de Facturas</Text>
        <TouchableOpacity style={styles.botonAccion}>
          <MaterialIcons name="filter-list" size={24} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* Lista de Facturas */}
      <FlatList
        data={facturas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaContenedor}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            {/* Encabezado de Tarjeta */}
            <View style={styles.encabezadoTarjeta}>
              <MaterialIcons name={item.icono} size={24} color="#1E3A8A" />
              <Text style={styles.cliente}>{item.cliente}</Text>
            </View>

            {/* Monto y Estado */}
            <View style={styles.filaPrincipal}>
              <Text style={styles.monto}>{item.monto}</Text>
              <View style={getEstadoStyle(item.estado)}>
                <Text style={getEstadoTextStyle(item.estado)}>{item.estado}</Text>
              </View>
            </View>

            {/* Detalles */}
            <View style={styles.separador} />
            
            <View style={styles.detalleFila}>
              <Text style={styles.detalleLabel}>Emisión:</Text>
              <Text style={styles.detalleValue}>{item.fechaEmision}</Text>
            </View>
            
            <View style={styles.detalleFila}>
              <Text style={styles.detalleLabel}>Vencimiento:</Text>
              <Text style={styles.detalleValue}>{item.fechaVencimiento}</Text>
            </View>
            
            <View style={styles.detalleFila}>
              <Text style={styles.detalleLabel}>Método:</Text>
              <Text style={styles.detalleValue}>{item.metodoPago}</Text>
            </View>

            {/* Botón de Acción */}
            <TouchableOpacity style={styles.botonVer}>
              <Text style={styles.botonVerTexto}>Ver Detalles</Text>
              <MaterialIcons name="chevron-right" size={20} color="#1E3A8A" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E3A8A',
    letterSpacing: 0.5
  },
  botonAccion: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF'
  },
  listaContenedor: {
    paddingHorizontal: 20,
    paddingTop: 16
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  encabezadoTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10
  },
  cliente: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B'
  },
  filaPrincipal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  monto: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A'
  },
  estadoBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center'
  },
  separador: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12
  },
  detalleFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  detalleLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500'
  },
  detalleValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600'
  },
  botonVer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 4
  },
  botonVerTexto: {
    color: '#1E3A8A',
    fontWeight: '600',
    fontSize: 14
  }
});

export default FacturasScreen;