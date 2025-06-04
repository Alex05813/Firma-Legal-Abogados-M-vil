import React, {useState, useEffect} from 'react';
import { Platform, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../../App'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'
import { getBaseUrl } from '../../../../../domain/services/getBaseUrl';
import { Proceso } from '../../../../../domain/models/procesos/interface-procesos';
import DateTimePicker, {
  DateTimePickerEvent,
  AndroidNativeProps,
  IOSNativeProps
} from '@react-native-community/datetimepicker';

type AbogadoEditAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoEditarAgendaScreen'>;

export const AbogadoEditarAgendaViewModel = ({ route }: { route: AbogadoEditAgendaRouteProp }) => {
    const { agendaData } = route.params;
      const navigation = useNavigation<NavigationProps>();
      type NavigationProps = StackNavigationProp<RootStackParamList, 'AbogadoEditarAgendaScreen'>;

      // estados
      const [selectedProceso, setSelectedProceso] = useState<number | null>(agendaData.id_proceso ? Number(agendaData.id_proceso) : null);      
      const [selectedStatus, setSelectedStatus] = useState(agendaData.estado || 'Programada');
      const [procesos, setProcesos] = useState<Proceso[]>([]);
      const [editarproceso, setEditarProceso] = useState<Proceso[]>([])
      const [fecha, setFecha] = useState(new Date(agendaData.fecha || Date.now()));
      const [showDatePicker, setShowDatePicker] = useState(false);  
      const [hora, setHora] = useState(agendaData.hora);
      const [descripcion, setDescripcion] = useState(agendaData.descripcion);

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
            navigation.goBack(); // Regresar a la pantalla anterior después de editar
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
    
        // Función para cambiar el estado 
        const handleStatusChange = (status: string) => {
          setSelectedStatus(status);
          console.log('Estado seleccionado:', status); 
      };

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

      const eliminar_cita = async () => {
        const baseurl = getBaseUrl();
        try {
          const response = await axios.delete(`${baseurl}/agendas/${agendaData.id_agenda}`);
          console.log("Cita eliminada:", response.data);
          Alert.alert(
            "Cita eliminada con exito!", 
            "Has eliminado la cita con exito:", // Título del mensaje
          )
          navigation.goBack(); // Regresar a la pantalla anterior después de eliminar
        }
        catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('Error del backend:', error.response?.data);
          }
          console.error("Error al eliminar la cita:", error);
        }
      }

      const confirmarEliminacion = () => {
          Alert.alert(
            "Eliminar cita", // Título del mensaje
            "¿Estás seguro de que deseas eliminar esta cita?", // Cuerpo del mensaje
            [
              {
                text: "No", // Botón "No"
                style: "cancel", // Estilo del botón
              },
              {
                text: "Sí", // Botón "Sí"
                onPress: eliminar_cita, // Llama a la función eliminar_cita si se presiona "Sí"
              },
            ],
            { cancelable: true } // Permite cerrar el diálogo tocando fuera de él
          );
        };
        
      return {
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
        confirmarEliminacion
      }
}

