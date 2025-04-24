import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList } from '../../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'
import { getBaseUrl } from '../../../../../domain/services/getBaseUrl';
import { AbogadoNuevaAgendaScreen as styles } from './abogado_nueva_agenda_screen_styles';
import ViewAbogadoNuevaAgendaScreen from './viewAbogadoNuevaAgendaScreenModel';

const AbogadoNuevaAgendaScreen = () => {

  const {form,
    handleChange,
    handleSubmit,
    insertar_cita,
    styles,
    navigation,} = ViewAbogadoNuevaAgendaScreen()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Agregar Nueva Cita</Text>

      {/* Formulario */}

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID Agenda *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3"
          value={form.id_agenda}
          onChangeText={(text) => handleChange('id_agenda', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 15/05/2024"
          value={form.fecha}
          onChangeText={(text) => handleChange('fecha', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Hora *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 14:30"
          value={form.hora}
          onChangeText={(text) => handleChange('hora', text)}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Ej: 1"
          value={form.id_proceso}
          onChangeText={(text) => handleChange('id_proceso', text)}
          keyboardType="numeric"
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={insertar_cita} // Llamamos a insertar_cita
        >
          <Text style={styles.buttonText}>Guardar Cita</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};



export default AbogadoNuevaAgendaScreen;