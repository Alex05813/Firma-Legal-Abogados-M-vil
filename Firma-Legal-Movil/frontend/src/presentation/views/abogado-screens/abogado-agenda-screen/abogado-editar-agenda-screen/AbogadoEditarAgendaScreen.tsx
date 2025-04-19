import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../../App'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { formatDateForInput } from '../../../../../utils/dateHelpers';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar primero
import axios from 'axios'
import { AbogadoEditarAgendaScreenStyle as styles } from './abogado_editar_agenda_screen_styles';
import { getBaseUrl } from '../../../../../domain/services/getBaseUrl';
import { Proceso } from '../../../../../domain/models/procesos/interface-procesos';

// Define el tipo para los parámetros
type CrudEditRouteProp = RouteProp<RootStackParamList, 'crudedit'>;

const crudedit = ({ route }: { route: CrudEditRouteProp }) => {
  const { agendaData } = route.params;
  const navigation = useNavigation<NavigationProps>();
  type NavigationProps = StackNavigationProp<RootStackParamList, 'crudedit'>;
  // estados
  const [selectedProceso, setSelectedProceso] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(agendaData.estado || 'Programada');
  const [procesos, setProcesos] = useState<Proceso[]>([]);

  const lista_procesos = async () => {
    try {
      const baseurl = getBaseUrl();
      const process = await axios.get(`${baseurl}/procesos`);
      setProcesos(process.data)
      console.log('LISTA DE PROCESOS OBTENIDOS DE LA APIIIII:', process.data);
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };

      // / Efecto para sincronizar con los datos iniciales
    useEffect(() => {
      setSelectedStatus(agendaData.estado || 'Programada');
      lista_procesos()
    }, [agendaData.estado]);

    // Función para cambiar el estado - VERSIÓN MODIFICADA
    const handleStatusChange = (status: string) => {
      setSelectedStatus(status);
      console.log('Estado seleccionado:', status); // ← Esto muestra en consola
      
    // Aquí podrías también actualizar agendaData.estado si necesitas
    // Por ejemplo:
    // agendaData.estado = status;
    // console.log('Datos actualizados:', agendaData);
  };
  
  return (
    // lista_procesos(),
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
        <Text style={styles.label}>Id de la cita</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={agendaData.id_agenda.toString()}
          editable={false}
        />

        {/* Fecha */}
        <Text style={styles.label}>Dia de la cita</Text>
        <TextInput
          style={styles.input}
          value={formatDateForInput(agendaData.fecha)}
        />

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={agendaData.hora}
        />

        {/* Estado (simulado con botones) */}
        <Text style={styles.label}>Estado de la cita</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity 
          style={[
            styles.radioButton, 
            selectedStatus === 'Programada' && styles.radioButtonSelected
          ]}
          onPress={() => handleStatusChange('Programada')}
        >
          <Text style={
            selectedStatus === 'Programada' 
              ? styles.radioButtonTextSelected 
              : styles.radioButtonText
          }>
            Programada
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.radioButton, 
            selectedStatus === 'Cancelada' && styles.radioButtonSelected
          ]}
          onPress={() => handleStatusChange('Cancelada')}
        >
          <Text style={
            selectedStatus === 'Cancelada' 
              ? styles.radioButtonTextSelected 
              : styles.radioButtonText
          }>
            Cancelada
          </Text>
        </TouchableOpacity>
      </View>

      {/* ID Agenda (solo lectura) */}
      <Text style={styles.label}>Proceso actual</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={agendaData.procesoDescripcion || ''}
          editable={false}
        />
      
      <Text style={styles.label}>Proceso a seleccionar</Text>
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedProceso}
        onValueChange={(itemValue) => { 
          // Encuentra el proceso seleccionado por su _id
          const procesoSeleccionado = procesos.find((proceso: Proceso) => proceso._id === itemValue);
          // Actualiza el estado con la descripción del proceso seleccionado
          setSelectedProceso(procesoSeleccionado ? procesoSeleccionado.descripcion : '');          
          console.log('Selección cambiada a:', itemValue);
          console.log('Selección cambiada a:', procesoSeleccionado?.descripcion);
        }}
        style={styles.picker}
        dropdownIconColor="#007AFF"
      >
        <Picker.Item label="Seleccione un proceso..." value="" />
        {Array.isArray(procesos) && procesos.map((proceso: Proceso) => (
          <Picker.Item 
            key={proceso._id} 
            label={`${proceso.tipo} - ${proceso.descripcion}`} 
            value={proceso._id} 
          />
        ))}
      </Picker>
      </View>

      <Text style={styles.label}>Proceso Elegido</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={selectedProceso} // Muestra la descripción del proceso seleccionado
        editable={false} // Opcional: Haz que el campo no sea editable si solo quieres mostrar la descripción
      />


        {/* Descripción */}
        <Text style={styles.label}>Descripción de la cita</Text>
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