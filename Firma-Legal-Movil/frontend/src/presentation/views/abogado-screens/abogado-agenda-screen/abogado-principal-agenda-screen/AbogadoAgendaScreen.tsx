import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { AbogadoAgendaScreenStyle as styles } from './abogado_agenda_screen_styles';
import AbogadoAgendaViewModel from './viewAbogadoAgendaScreenModel';
import { Agenda } from '../../../../../domain/models/agenda/interface-agenda';
import { RouteProp, useRoute } from '@react-navigation/native';

type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoAgendaScreen'>;
type AbogadoAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoNuevaAgendaScreen'>;

const AbogadoAgendaScreen = () => {
      const route = useRoute<AbogadoAgendaRouteProp>();
      const { numIdentificacion2 } = route.params; // Extrae el parámetro
      const navigation = useNavigation<NavigationProps>();
      const { 
        // incrementarMes,
        // decrementarMes,
        nombreMesActual,
        diasSemana,
        numerosDias,
        agendas,
        dia,} 
        = AbogadoAgendaViewModel()

        // Estados del modal
      const [modalVisible, setModalVisible] = useState(false);
      const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);

    const obtenerDiaActual = () => {
    const hoy = new Date();
    const diasSemanaCompletos = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaActual = diasSemanaCompletos[hoy.getDay()];
    
    const mapeoAbreviaciones: { [key: string]: string } = {
      'Domingo': 'Do',
      'Lunes': 'Lu', 
      'Martes': 'Ma',
      'Miércoles': 'Mi',
      'Jueves': 'Ju',
      'Viernes': 'Vi',
      'Sábado': 'Sa'
    };
    
    return mapeoAbreviaciones[diaActual] || '';
    };

  const esDiaActual = (dia: string) => {
    return dia === obtenerDiaActual();
  };

   // Función para abrir el modal con los detalles de la cita
    const abrirModalDetalles = (agenda: Agenda) => {
        setSelectedAgenda(agenda);
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalVisible(false);
        setSelectedAgenda(null);
    };

      // Función para formatear la fecha
    const formatearFecha = (fecha: string) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


        // Depuracion
        console.log('Agendas a renderizar:', agendas);
        console.log('Número de citas:', agendas.length);
        console.log('Valor de nombreMesActual:', nombreMesActual);
        console.log('Valor de diasSemana:', diasSemana);
        console.log('Valor de numerosDias:', numerosDias);

    return (
      <View style={styles.container}>
            {/* Encabezado ajustado */}
            <View style={styles.header}>
                {/* Botón "Volver" en esquina superior izquierda */}
                <TouchableOpacity
                onPress={()=>{
                    navigation.goBack()
                }}
                style={styles.backButtonContainer}>
                <Text style={styles.backButton}>Volver</Text>
                </TouchableOpacity>
               
                {/* Título y fecha centrados */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Tu Agenda de Citas</Text>
                    <Text style={styles.date}>{dia}</Text>
                    <Image
                        source={require('../../../../../../assets/calendar.png')}
                        style={styles.calendarIcon}
                    />
                </View>
            </View>

            {/* Resto del código (barra de días y lista de citas) */}
            <View style={styles.mesContainer}>
                    <Text>{' '}</Text>

                {/* Validación para asegurar que nombreMesActual sea una cadena válida */}
                <Text style={styles.nombreMes}>{typeof nombreMesActual === 'string' && nombreMesActual.trim() !== '' ? nombreMesActual : 'Mes desconocido'}</Text>
                
                    <Text>{' '}</Text>
            </View>

            {/* MODIFICACIÓN PRINCIPAL: diasContainer con lógica para resaltar día actual */}
      <View style={styles.diasContainer}>
        {diasSemana.map((dia, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.diaItem,
              esDiaActual(dia) && styles.diaActual // Aplicar estilo especial si es el día actual
            ]}
          >
            <Text 
              style={[
                styles.diaText,
                esDiaActual(dia) && styles.diaActualText // Cambiar color del texto si es día actual
              ]}
            >
              {typeof dia === 'string' && dia.trim() !== '' ? dia : 'Día'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

            <ScrollView style={styles.scrollContainer}>
             {Array.isArray(agendas) && agendas.map((agenda: Agenda) => (
                <TouchableOpacity 
                    key={agenda._id} 
                    style={styles.citaCard}
                    onPress={() => abrirModalDetalles(agenda)} // Aquí agregamos la funcionalidad de toque
                    activeOpacity={0.7}>
                  
                  {/* Primera fila: Hora (izq) y Fecha (der) */}
                  <View style={styles.filaSuperior}>
                    <Text style={styles.hora}>{agenda.hora}</Text>
                    <Text style={styles.fecha}>{new Date(agenda.fecha).toLocaleDateString('es-ES')}</Text>
                  </View>

                  {/* Descripción */}
                  <Text style={styles.descripcion}>{agenda.descripcion}</Text>
                  
                  {/* Nueva sección: Descripción del proceso */}
                  {agenda.procesoDescripcion && (
                    <View style={styles.procesoContainer}>
                      <Text style={styles.procesoTitle}>Proceso:</Text>
                      <Text style={styles.procesoDescripcion}>
                        {agenda.procesoDescripcion.length > 50 
                          ? `${agenda.procesoDescripcion.substring(0, 50)}...` 
                          : agenda.procesoDescripcion}
                      </Text>
                    </View>
                  )}

                  {/* Estado */}
                  <View style={styles.filaEstado}>
                    <View style={[
                      styles.estadoBadge, 
                      agenda.estado === 'Cancelada' ? styles.estadoCancelada : styles.estadoCompletada
                    ]}>
                      <Text style={styles.estadoText}>{agenda.estado}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation(); // Evita que se abra el modal cuando se presiona "Editar"
                        navigation.navigate('AbogadoEditarAgendaScreen', { 
                          agendaData: {
                            id_agenda: agenda.id_agenda,
                            fecha: agenda.fecha,
                            hora: agenda.hora, 
                            estado: agenda.estado,
                            descripcion: agenda.descripcion,
                            procesoDescripcion: agenda.procesoDescripcion,
                            id_proceso: agenda.id_proceso,
                            numeroIdentificacionAbogado: agenda.numeroIdentificacionAbogado,
                          }
                        });
                      }}>
                      <Text style={styles.hora}>Editar cita</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Modal para mostrar detalles completos de la cita */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={cerrarModal}>
                <View style={modalStyles.modalOverlay}>
                    <View style={modalStyles.modalContent}>
                        <ScrollView style={modalStyles.modalScrollView}>
                            <View style={modalStyles.modalHeader}>
                                <Text style={modalStyles.modalTitle}>Detalles de la Cita</Text>
                                <TouchableOpacity 
                                    onPress={cerrarModal}
                                    style={modalStyles.closeButton}>
                                    <Text style={modalStyles.closeButtonText}>×</Text>
                                </TouchableOpacity>
                            </View>

                            {selectedAgenda && (
                                <View style={modalStyles.modalBody}>
                                    <View style={modalStyles.detailRow}>
                                        <Text style={modalStyles.detailLabel}>Fecha:</Text>
                                        <Text style={modalStyles.detailValue}>
                                            {formatearFecha(selectedAgenda.fecha)}
                                        </Text>
                                    </View>

                                    <View style={modalStyles.detailRow}>
                                        <Text style={modalStyles.detailLabel}>Hora:</Text>
                                        <Text style={modalStyles.detailValue}>{selectedAgenda.hora}</Text>
                                    </View>

                                    <View style={modalStyles.detailRow}>
                                        <Text style={modalStyles.detailLabel}>Estado:</Text>
                                        <View style={[
                                            modalStyles.estadoBadge,
                                            selectedAgenda.estado === 'Cancelada' 
                                                ? modalStyles.estadoCancelada 
                                                : modalStyles.estadoCompletada
                                        ]}>
                                            <Text style={modalStyles.estadoText}>{selectedAgenda.estado}</Text>
                                        </View>
                                    </View>

                                    <View style={modalStyles.detailColumn}>
                                        <Text style={modalStyles.detailLabel}>Descripción:</Text>
                                        <Text style={modalStyles.detailValueLong}>
                                            {selectedAgenda.descripcion}
                                        </Text>
                                    </View>

                                    {selectedAgenda.procesoDescripcion && (
                                        <View style={modalStyles.detailColumn}>
                                            <Text style={modalStyles.detailLabel}>Descripción del Proceso:</Text>
                                            <Text style={modalStyles.detailValueLong}>
                                                {selectedAgenda.procesoDescripcion}
                                            </Text>
                                        </View>
                                    )}

                                    {selectedAgenda.id_proceso && (
                                        <View style={modalStyles.detailRow}>
                                            <Text style={modalStyles.detailLabel}>ID Proceso:</Text>
                                            <Text style={modalStyles.detailValue}>{selectedAgenda.id_proceso}</Text>
                                        </View>
                                    )}

                                    <View style={modalStyles.detailRow}>
                                        <Text style={modalStyles.detailLabel}>ID Cita:</Text>
                                        <Text style={modalStyles.detailValue}>{selectedAgenda.id_agenda}</Text>
                                    </View>
                                </View>
                            )}
                        </ScrollView>

                        <View style={modalStyles.modalFooter}>
                            <TouchableOpacity 
                                style={modalStyles.editButton}
                                onPress={() => {
                                    cerrarModal();
                                    if (selectedAgenda) {
                                        navigation.navigate('AbogadoEditarAgendaScreen', { 
                                            agendaData: {
                                                id_agenda: selectedAgenda.id_agenda,
                                                fecha: selectedAgenda.fecha,
                                                hora: selectedAgenda.hora, 
                                                estado: selectedAgenda.estado,
                                                descripcion: selectedAgenda.descripcion,
                                                procesoDescripcion: selectedAgenda.procesoDescripcion,
                                                id_proceso: selectedAgenda.id_proceso,
                                                numeroIdentificacionAbogado: selectedAgenda.numeroIdentificacionAbogado,
                                            }
                                        });
                                    }
                                }}>
                                <Text style={modalStyles.editButtonText}>Editar Cita</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={modalStyles.closeModalButton}
                                onPress={cerrarModal}>
                                <Text style={modalStyles.closeModalButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Botón flotante */}
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('AbogadoNuevaAgendaScreen',{
                  numIdentificacion2: numIdentificacion2 // Pasar el parámetro numIdentificacion2
                })
            }}
            style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

// Estilos para el modal
const modalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        maxHeight: '80%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalScrollView: {
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    modalBody: {
        padding: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 5,
    },
    detailColumn: {
        marginBottom: 15,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    detailValue: {
        fontSize: 16,
        color: '#666',
        flex: 1,
        textAlign: 'right',
    },
    detailValueLong: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    estadoBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    estadoCompletada: {
        backgroundColor: '#4CAF50',
    },
    estadoCancelada: {
        backgroundColor: '#f44336',
    },
    estadoText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    editButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        flex: 1,
        marginRight: 10,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeModalButton: {
        backgroundColor: '#9E9E9E',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        flex: 1,
        marginLeft: 10,
    },
    closeModalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AbogadoAgendaScreen;