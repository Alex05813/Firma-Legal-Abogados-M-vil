import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
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

        // NUEVA FUNCIÓN: Obtener el día actual de la semana
    const obtenerDiaActual = () => {
    const hoy = new Date();
    const diasSemanaCompletos = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaActual = diasSemanaCompletos[hoy.getDay()];
    
    // Mapear a las abreviaciones que usas en tu app
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

  // NUEVA FUNCIÓN: Verificar si un día es el día actual
  const esDiaActual = (dia: string) => {
    return dia === obtenerDiaActual();
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
                <View key={agenda._id} style={styles.citaCard}>
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
                    
                    {/* Mostrar el id de la cita opcional para depuracion */}
                  {/* <Text style={styles.descripcion}>{agenda.id_agenda}</Text> */}

                  {/* Estado */}
                  <View style={styles.filaEstado}>
                    <View style={[
                      styles.estadoBadge, 
                      agenda.estado === 'Cancelada' ? styles.estadoCancelada : styles.estadoCompletada
                    ]}>
                      <Text style={styles.estadoText}>{agenda.estado}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AbogadoEditarAgendaScreen', { 
                        agendaData: {
                          id_agenda: agenda.id_agenda,
                          fecha: agenda.fecha,
                          hora: agenda.hora, 
                          estado: agenda.estado,
                          descripcion: agenda.descripcion,
                          procesoDescripcion: agenda.procesoDescripcion , // Asegúrate de que este campo sea opcional
                          id_proceso: agenda.id_proceso, // Asegúrate de que este campo sea opcional
                          numeroIdentificacionAbogado: agenda.numeroIdentificacionAbogado, // Asegúrate de que este campo sea opcional
                        }
                      })}>
                      <Text style={styles.hora}>Editar cita</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

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

export default AbogadoAgendaScreen;