import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../App'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { crud_styles as styles } from './crud-edit-styles';
import axios from 'axios'


// Define el tipo para los parámetros
type CrudEditRouteProp = RouteProp<RootStackParamList, 'crudedit'>;

const crudedit = ({ route }: { route: CrudEditRouteProp }) => {

  const [procesos, setProcesos] = useState('')

  const { agendaData } = route.params;

    type NavigationProps = StackNavigationProp<RootStackParamList, 'crudedit'>;
  const navigation = useNavigation<NavigationProps>();

  const lista_procesos = async () => {
    try {
      const process = await axios.get('http://192.168.1.39:9000/api/procesos')
      setProcesos(process.data)
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Editar Cita</Text>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Formulario */}
      <ScrollView contentContainerStyle={styles.formContainer}>

        {/* ID Agenda (solo lectura) */}
        <Text style={styles.label}>ID Agenda</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={agendaData.id_agenda.toString()}
          editable={false}
        />

        {/* Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={agendaData.fecha}
        />

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={agendaData.hora}
        />

        {/* Estado (simulado con botones) */}
        <Text style={styles.label}>Estado</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity style={[styles.radioButton, styles.radioButtonSelected]}>
            <Text style={styles.radioButtonTextSelected}>Programada</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton}>
            <Text style={styles.radioButtonText}>Cancelada</Text>
          </TouchableOpacity>
        </View>

        {/* ID Proceso */}
        <Text style={styles.label}>ID Proceso</Text>
        <TextInput
          style={styles.input}
          value={agendaData.id_proceso}
          keyboardType="numeric"
        />

        {/* Descripción */}
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={agendaData.descripcion}
        />

        {/* Botones */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default crudedit ;