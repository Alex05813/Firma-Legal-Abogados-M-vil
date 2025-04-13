import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { crudstyles as styles } from './crud';
import view from './view';

const crudscreen = () => {
  type NavigationProps = StackNavigationProp<RootStackParamList, 'crudedit'>;
      const navigation = useNavigation<NavigationProps>();

      const { incrementarMes,
          decrementarMes,
          nombreMesActual,
          diasSemana,
          numerosDias,
          agendas,
          dia,} = view()

    return (
      <View style={styles.container}>
            {/* Encabezado ajustado de la crud*/}
            <View style={styles.header}>
                {/* Botón "Volver" en esquina superior izquierda */}
                <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('AbogadoPrincipalScreen')
                }}
                style={styles.backButtonContainer}>
                <Text style={styles.backButton}>Volver</Text>
                </TouchableOpacity>
               
                {/* Título y fecha centrados */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Crud agendas</Text>
                    <Text style={styles.date}>{dia}</Text>
                    <Image
                        source={require('../../../../assets/calendar.png')}
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

            {/* Lista de citas */}
            <ScrollView style={styles.scrollContainer}>

              {agendas.map((agenda) => (
                <TouchableOpacity>
                <View key={agenda._id} style={styles.citaCard}>

                  {/* Primera fila: Hora (izq) y Fecha (der) */}
                  <View style={styles.filaSuperior}>
                    <Text style={styles.hora}>{agenda.hora}</Text>
                    <Text style={styles.fecha}>{agenda.fecha}</Text>
                  </View>

                  {/* Descripción */}
                  <Text style={styles.descripcion}>{agenda.descripcion}</Text>
                  <Text style={styles.descripcion}>{agenda.id_agenda}</Text>


                  {/* Estado */}
                  <View style={styles.filaEstado}>
                    <View style={[
                      styles.estadoBadge, 
                      agenda.estado === 'Cancelada' ? styles.estadoCancelada : styles.estadoCompletada
                    ]}>
                      <Text style={styles.estadoText}>{agenda.estado}</Text>
                    </View>

                    <TouchableOpacity
                    onPress={() => navigation.navigate('crudedit', { 
                      agendaData: {
                        id_agenda: agenda.id_agenda,
                        fecha: agenda.fecha,
                        hora: agenda.hora, 
                        estado: agenda.estado,
                        id_proceso: agenda.id_proceso,
                        descripcion: agenda.descripcion
                      }
                    })}>
                    <Text style={styles.hora}>Editar cita</Text>
                    </TouchableOpacity>

                  </View>
                </View>
                </TouchableOpacity>

              ))}
            </ScrollView>
           
            {/* Botón flotante */}
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('AbogadoNuevaAgendaScreen')
            }}
            style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};


export default crudscreen;