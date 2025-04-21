import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Platform } from 'react-native';
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
import AbogadoEditarAgendaViewModel from './viewAbogadoEditarAgendaScreenModel';
import DateTimePicker, {
  DateTimePickerEvent,
  AndroidNativeProps,
  IOSNativeProps
} from '@react-native-community/datetimepicker';
// Define el tipo para los parámetros
type AbogadoEditAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoEditarAgendaScreen'>;

const AbogadoEditarAgendaScreen = ({ route }: { route: AbogadoEditAgendaRouteProp }) => {
  const { agendaData } = route.params;
  const navigation = useNavigation<NavigationProps>();
  type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoEditarAgendaScreen'>;

  // Estados para los campos editables
  const [fecha, setFecha] = useState(new Date(agendaData.fecha || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);  
  const [hora, setHora] = useState(agendaData.hora);
  const [descripcion, setDescripcion] = useState(agendaData.descripcion);

  const {
    selectedProceso,
    setSelectedProceso,
    selectedStatus,
    procesos,
    handleStatusChange,
  } = AbogadoEditarAgendaViewModel({ route });

  const handleDateChange = (
    event: DateTimePickerEvent, 
    selectedDate: Date | undefined
  ) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  // Formateador de fecha para mostrar
  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '/');
  };

  const editar_proceso = async () => {
    try {
      const baseurl = getBaseUrl();
      // 1. Preparar el objeto de datos a enviar
    const datosActualizados: any = {
      fecha: fecha.toISOString(), // Envía en formato "2025-04-12T00:00:00.000Z"
      hora: hora.endsWith(':00') ? hora : `${hora}:00`,
      descripcion,
      estado: selectedStatus,
      id_proceso: Number(selectedProceso) // Conversión explícita
    };

    console.log("Datos COMPLETOS a enviar:", datosActualizados);

    // 2. Solo agregar id_proceso si tiene un valor numérico válido
    if (selectedProceso && !isNaN(Number(selectedProceso))) {
      datosActualizados.id_proceso = Number(selectedProceso);
    }
      // 3. Enviar la solicitud
      const response = await axios.put(`${baseurl}/agendas/${agendaData.id_agenda}`, datosActualizados);
    console.log("Respuesta del servidor:", response.data);
      navigation.goBack();
    } catch (error) {

      if (axios.isAxiosError(error)) {
        console.log('Error del backend:', error.response?.data);
      }
      console.log("Datos enviados:", {
        fecha: fecha.toISOString(),
        hora,
        descripcion,
        estado: selectedStatus,
        id_proceso: selectedProceso || 'No enviado' // Para debug
      });
    }
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
        {/* Campo de fecha mejorado */}
        <View>
      <Text style={styles.label}>Fecha de la cita</Text>
      
      <TouchableOpacity 
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInputContainer}
      >
        <Text style={styles.dateText}>{formatDisplayDate(fecha)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
          locale="es-ES"
          onChange={handleDateChange}
        />
      )}
    </View>

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={hora}
          onChangeText={setHora}
        />

        {/* Estado (simulado con botones) */}
        <Text style={styles.label}>Estado de la cita</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity 
          style={[
            styles.radioButton, 
            selectedStatus === 'programada' && styles.radioButtonSelected
          ]}
          onPress={() => handleStatusChange('programada')}
        >
          <Text style={
            selectedStatus === 'programada' 
              ? styles.radioButtonTextSelected 
              : styles.radioButtonText
          }>
            Programada
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.radioButton, 
            selectedStatus === 'cancelada' && styles.radioButtonSelected
          ]}
          onPress={() => handleStatusChange('cancelada')}
        >
          <Text style={
            selectedStatus === 'cancelada' 
              ? styles.radioButtonTextSelected 
              : styles.radioButtonText
          }>
            Cancelada
          </Text>
        </TouchableOpacity>
      </View>

     
      
      <Text style={styles.label}>Proceso a seleccionar</Text>
      <View style={styles.pickerContainer}>

      <Picker
  selectedValue={selectedProceso !== null ? selectedProceso.toString() : ""}
  onValueChange={(itemValue) => { 
    if (itemValue === "") {
      setSelectedProceso(null);
    } else {
      const procesoSeleccionado = procesos.find((p: Proceso) => 
        p.id_proceso.toString() === itemValue
      );
      setSelectedProceso(procesoSeleccionado ? procesoSeleccionado.id_proceso : null);
      console.log('ID Proceso seleccionado:', procesoSeleccionado?.id_proceso);
    }
  }}
  style={styles.picker}
  dropdownIconColor="#007AFF"
>
  <Picker.Item label="Seleccione un proceso..." value="" />
  {Array.isArray(procesos) && procesos.map((proceso: Proceso) => (
    <Picker.Item 
      key={proceso._id} 
      label={`${proceso.tipo} - ${proceso.descripcion}`} 
      value={proceso.id_proceso.toString()}
    />
  ))}
</Picker>
      </View>

      <Text style={styles.label}>Proceso Elegido</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={
          selectedProceso !== null 
            ? procesos.find(p => p.id_proceso === selectedProceso)?.descripcion || ''
            : 'Ningún proceso seleccionado'
        }
        editable={false}
      />


        {/* Descripción */}
        <Text style={styles.label}>Descripción de la cita</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* Botones */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.saveButton]}
          onPress={editar_proceso}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AbogadoEditarAgendaScreen ;