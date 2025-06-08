import React, { useState } from 'react';
import { Alert } from 'react-native';
import { RootStackParamList } from '../../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'
import { getBaseUrl } from '../../../../../domain/services/getBaseUrl';
import { AbogadoNuevaAgendaScreen as styles } from './abogado_nueva_agenda_screen_styles';
import { Proceso } from '../../../../../domain/models/procesos/interface-procesos';
import { RouteProp } from '@react-navigation/native';

type AbogadoEditAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoNuevaAgendaScreen'>;
const ViewAbogadoNuevaAgendaScreen = ({ route }: { route: AbogadoEditAgendaRouteProp }) => {

    type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoNuevaAgendaScreen'>;
    const { numIdentificacion2 } = route.params;
          console.log('Número de identificación del abogado, desde el VIEWMODEL:', numIdentificacion2); // Verifica el valor del parámetro

            const navigation = useNavigation<NavigationProps>();
    
      const [form, setForm] = useState({
        fecha: '',
        hora: '',
        descripcion: '',
        estado: 'Programada',
        proceso: '',
        id_proceso:'',
      });

      const [procesos, setProcesos] = useState<Proceso[]>([]);
      
    
      const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
      };
    
      const handleSubmit = () => {
        console.log('Cita guardada:', form);
        navigation.goBack();
      };
    
      const insertar_cita = async () => {
        try {
          // Validar que todos los campos estén completos
          if (!form.fecha || !form.hora || !form.descripcion || !form.id_proceso) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
          }
          
          // Convertir la fecha ingresada al formato ISO 8601
        const [day, month, year] = form.fecha.split('/'); // Dividimos la fecha en día, mes y año
        const fechaISO = new Date(`${year}-${month}-${day}T${form.hora}`).toISOString(); // Construimos la fecha en formato ISO
        if (isNaN(Date.parse(fechaISO))) {
          Alert.alert('Error', 'La fecha ingresada no es válida.');
          return;
        }
    
    
          // Crear el objeto para enviar al backend
          const nuevaCita = {
            fecha: fechaISO,
            hora: form.hora,
            descripcion: form.descripcion,
            estado: form.estado.toLowerCase(), // Convertimos a minúsculas
            id_proceso: form.id_proceso, // Convertimos a número
          };
    
          // Realizar la solicitud POST
          const baseUrl = getBaseUrl();
          const response = await axios.post(`${baseUrl}/agendas`, nuevaCita);
    
          // Mostrar mensaje de éxito
          Alert.alert('Éxito', 'La cita se ha guardado correctamente.');
          navigation.goBack(); // Volver a la pantalla anterior
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Hubo un problema al guardar la cita.');
        }
      };

      const lista_procesos = async () => {
        try {
          const baseurl = getBaseUrl();
          const process = await axios.get(`${baseurl}/procesos/abogado/${numIdentificacion2}`);
          setProcesos(process.data)
          console.log('_____________NUMERO DE PROCESOS ENCONTRADOS DESDE EL APARTADO DE LA NUEVA AGENDA_________:', process.data.length);
          console.log('Procesos obtenidos:', process.data);
          
        } catch (error) {
          console.error('Error al obtener los procesos:', error);
        }
      };

      return {
        form,
        handleChange,
        handleSubmit,
        insertar_cita,
        styles,
        navigation,
        lista_procesos,
        procesos, setProcesos
      }
}
export default ViewAbogadoNuevaAgendaScreen;