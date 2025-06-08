import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../../../../../../App';
import { AbogadoNuevaAgendaScreen as styles } from './abogado_nueva_agenda_screen_styles';
import ViewAbogadoNuevaAgendaScreen from './viewAbogadoNuevaAgendaScreenModel';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type AbogadoEditAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoNuevaAgendaScreen'>;

const AbogadoNuevaAgendaScreen = ({ route }: { route: AbogadoEditAgendaRouteProp }) => {
      const { numIdentificacion2 } = route.params;
      console.log('Número de identificación del abogado:', numIdentificacion2); // Verifica el valor del parámetro

      // Estados para el DateTimePicker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
      
      React.useEffect(() => {
        lista_procesos()
      }, [])
      

  const {form,
    handleChange,
    handleSubmit,
    insertar_cita,
    styles,
    navigation,
    lista_procesos, 
  procesos, setProcesos} = ViewAbogadoNuevaAgendaScreen({ route });
      console.log('Lista de procesos:', procesos);

      // / Función para manejar el cambio de fecha
  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      handleChange('fecha', formattedDate);
    }
  };

  // Función para manejar el cambio de hora
  const onTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (time) {
      setSelectedTime(time);
      const formattedTime = time.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      handleChange('hora', formattedTime);
    }
  };

  // Función para formatear la fecha mostrada
  const getDisplayDate = () => {
    if (form.fecha) {
      return form.fecha;
    }
    return 'Seleccionar fecha';
  };

  // Función para formatear la hora mostrada
  const getDisplayTime = () => {
    if (form.hora) {
      return form.hora;
    }
    return 'Seleccionar hora';
  };

  return (
    <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 1}
        >
    
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Agregar Nueva Cita</Text>

      {/* Formulario */}

      {/* Campo de Fecha mejorado */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha *</Text>
        <TouchableOpacity
          style={[styles.input, styles.datePickerButton]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[
            styles.datePickerText, 
            !form.fecha && styles.placeholderText
          ]}>
            {getDisplayDate()}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
            locale="es-ES"
          />
        )}
      </View>

       {/* Campo de Hora mejorado */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Hora *</Text>
        <TouchableOpacity
          style={[styles.input, styles.datePickerButton]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={[
            styles.datePickerText, 
            !form.hora && styles.placeholderText
          ]}>
            {getDisplayTime()}
          </Text>
        </TouchableOpacity>
        
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
            is24Hour={true}
            locale="es-ES"
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Detalles de la cita..."
          value={form.descripcion}
          onChangeText={(text) => handleChange('descripcion', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Estado</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.estado}
            onValueChange={(value) => handleChange('estado', value)}
          >
            <Picker.Item label="Programada" value="Programada" />
            <Picker.Item label="Cancelada" value="Cancelada" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
      <Text style={styles.label}>ID Proceso *</Text>
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={form.id_proceso}
      onValueChange={(value) => handleChange('id_proceso', value)}
    >
      <Picker.Item label="Selecciona un proceso..." value="" />
      {procesos && procesos.map((proceso: any) => (
        <Picker.Item
          key={proceso.id_proceso}
          label={proceso.descripcion}
          value={proceso.id_proceso}
        />
      ))}
      {/* <Picker.Item label="Proceso 1" value="process.data.descripcion" />
      <Picker.Item label="Proceso 2" value="2" />
      Agrega más opciones aquí */}
    </Picker>
  </View>
</View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonTextdos}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={insertar_cita} // Llamamos a insertar_cita
        >
          <Text style={styles.buttonText}>Guardar Cita</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default AbogadoNuevaAgendaScreen;