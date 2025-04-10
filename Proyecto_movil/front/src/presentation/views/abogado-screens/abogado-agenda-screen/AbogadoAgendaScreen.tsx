import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { AbogadoAgendaScreenStyle as styles, AbogadoAgendaScreenStyle } from './abogado_agenda_screen_styles';
import axios from 'axios';
import AbogadoAgendaViewModel from './viewAbogadoAgendaScreenModel';

const AbogadoAgendaScreen = () => {
  type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoAgendaScreen'>;
      const navigation = useNavigation<NavigationProps>();

      const { incrementarMes,
          decrementarMes,
          nombreMesActual,
          diasSemana,
          numerosDias,
          fechaActual,
          mes,
          agendas,
          error,
          dia,} = AbogadoAgendaViewModel()

    return (
      <View style={styles.container}>
            {/* Encabezado ajustado */}
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
                    <Text style={styles.title}>Agendamiento Abogado</Text>
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
              {agendas.map((agenda) => (
                <View key={agenda._id} style={styles.citaCard}>
                  {/* Primera fila: Hora (izq) y Fecha (der) */}
                  <View style={styles.filaSuperior}>
                    <Text style={styles.hora}>{agenda.hora}</Text>
                    <Text style={styles.fecha}>{agenda.fecha}</Text>
                  </View>

                  {/* Descripción */}
                  <Text style={styles.descripcion}>{agenda.descripcion}</Text>

                  {/* Estado */}
                  <View style={styles.filaEstado}>
                    <View style={[
                      styles.estadoBadge, 
                      agenda.estado === 'Cancelada' ? styles.estadoCancelada : styles.estadoCompletada
                    ]}>
                      <Text style={styles.estadoText}>{agenda.estado}</Text>
                    </View>
                  </View>
                </View>
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


export default AbogadoAgendaScreen;