import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Platform, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../../App'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de instalar primero
import { AbogadoEditarAgendaScreenStyle as styles } from './abogado_editar_agenda_screen_styles';
import { Proceso } from '../../../../../domain/models/procesos/interface-procesos';
import AbogadoEditarAgendaViewModel from './viewAbogadoEditarAgendaScreenModel';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getBaseUrl } from '../../../../../domain/services/getBaseUrl';
import axios from 'axios';

type AbogadoEditAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoEditarAgendaScreen'>;

const AbogadoEditarAgendaScreen = ({ route }: { route: AbogadoEditAgendaRouteProp }) => {
  const { agendaData } = route.params;
  const navigation = useNavigation<NavigationProps>();
  type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoEditarAgendaScreen'>;

  const {
    selectedProceso,
        setSelectedProceso,
        selectedStatus,
        setSelectedStatus,
        procesos,
        setProcesos,
        lista_procesos,
        handleStatusChange,
        editar_proceso,
        setEditarProceso,
        handleDateChange,
        formatDisplayDate,
        showDatePicker,
        setShowDatePicker,
        fecha,
        setFecha,
        hora,
        setHora,
        descripcion,
        setDescripcion,
        confirmarEliminacion,
  } = AbogadoEditarAgendaViewModel({ route });
  
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
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={confirmarEliminacion} // Llama a confirmarEliminacion al presionar
        >
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