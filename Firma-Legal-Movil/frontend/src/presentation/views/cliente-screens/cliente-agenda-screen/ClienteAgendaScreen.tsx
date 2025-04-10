import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';

const ClienteAgendaScreen = () => {
  type NavigationProps = StackNavigationProp<RootStackParamList, 'ClienteAgendaScreen'>;
    const navigation = useNavigation<NavigationProps>();
    const citas = [
        {
          id: '1',
          hora: '1:00 PM - 12:51 PM',
          descripcion: 'Cita agendada para charlar sobre la gana de La Fasza de la Mja de mi cliente',
          estado: 'Pendiente',
          avatar: 'https://via.placeholder.com/40',
        },
        {
          id: '2',
          hora: '3:30 PM - 4:00 PM',
          descripcion: 'Revisión de contrato con el equipo legal',
          estado: 'Completada',
          avatar: 'https://via.placeholder.com/40',
        },
    ];
    // Dentro del componente ClienteAgendaScreen
const [mesActual, setMesActual] = useState(new Date().getMonth()); // Estado para el mes actual

const incrementarMes = () => {
    setMesActual((prevMes) => (prevMes + 1) % 12); // Avanza al siguiente mes
};

const decrementarMes = () => {
    setMesActual((prevMes) => (prevMes - 1 + 12) % 12); // Retrocede al mes anterior
};

// Obtener el nombre del mes
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const nombreMesActual = meses[mesActual];

    const diasSemana = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
    const numerosDias = [26, 27, 28, 29, 30, 31, 1]; // Cambia estos números según el mes actual
    const fechaActual = new Date();
    const dia = fechaActual.getDate() + ' de ' + meses[fechaActual.getMonth()] + ' ' + fechaActual.getFullYear(); // Formato: 26 de Septiembre de 2023
    const mes = meses[fechaActual.getMonth()] ; // Los meses son 0-indexados

    return (
        <View style={styles.container}>
            {/* Encabezado ajustado */}
            <View style={styles.header}>
                {/* Botón "Volver" en esquina superior izquierda */}
                <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('ClientePrincipalScreen')
                }}
                style={styles.backButtonContainer}>
                <Text style={styles.backButton}>Volver</Text>
                </TouchableOpacity>
                
                {/* Título y fecha centrados */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Agendamiento del cliente</Text>
                    <Text style={styles.date}>{dia}</Text>
                    <Image
                        source={require('../../../../../assets/calendar.png')} 
                        style={styles.calendarIcon}
                    />
                </View>
            </View>

            {/* Resto del código (barra de días y lista de citas) */}
            <View style={styles.mesContainer}>
                <TouchableOpacity onPress={decrementarMes}>
                    <Text>{'<'}</Text>
                </TouchableOpacity>
                <Text>{nombreMesActual}</Text>
                <TouchableOpacity onPress={incrementarMes}>
                    <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.diasContainer}>
                {diasSemana.map((dia, index) => (
                    <TouchableOpacity key={index} style={styles.diaItem}>
                        <Text style={styles.diaText}>{dia}</Text>
                        <Text style={styles.numeroDiaText}>{numerosDias[index]}</Text> {/* Mostrar el número del día */}
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.scrollContainer}>
                {citas.map((cita) => (
                    <View key={cita.id} style={styles.citaCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.hora}>{cita.hora}</Text>
                            <Image source={{ uri: cita.avatar }} style={styles.avatar} />
                        </View>
                        <Text style={styles.descripcion}>{cita.descripcion}</Text>
                        <View style={[styles.estadoBadge, cita.estado === 'Pendiente' ? styles.pendiente : styles.completada]}>
                            <Text style={styles.estadoText}>{cita.estado}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Botón flotante */}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  mesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
},
botonMes: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
},
textoMes: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
},
  numeroDiaText: {
    fontSize: 12,
    color: '#495057',
    textAlign: 'center', // Centra el número debajo de la inicial
},
  header: {
    marginTop: 40,
    marginBottom: 20,
    width: '100%',
  },
  backButtonContainer: {
    position: 'absolute', // Posiciona el botón "Volver" absolutamente
    left: 0,
    top: 0,
    zIndex: 1, // Asegura que esté por encima del título
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  titleContainer: {
    alignItems: 'center', // Centra el título y la fecha
    marginTop: 24, // Espacio debajo del botón "Volver"
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  diasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  diaItem: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  diaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
  scrollContainer: {
    flex: 1,
  },
  citaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hora: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  descripcion: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 12,
    lineHeight: 20,
  },
  estadoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  pendiente: {
    backgroundColor: '#ffc107', // Amarillo para pendientes
  },
  completada: {
    backgroundColor: '#28a745', // Verde para completadas
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  calendarIcon:{
    width: 30,
    height: 30,
  }
});

export default ClienteAgendaScreen;