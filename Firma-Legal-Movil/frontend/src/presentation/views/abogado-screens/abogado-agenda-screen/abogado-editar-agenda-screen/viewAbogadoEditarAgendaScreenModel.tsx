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

type AbogadoEditAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoEditarAgendaScreen'>;

const AbogadoEditarAgendaViewModel = ({ route }: { route: AbogadoEditAgendaRouteProp }) => {
    const { agendaData } = route.params;
      // estados
      const [selectedProceso, setSelectedProceso] = useState('');
      const [selectedStatus, setSelectedStatus] = useState(agendaData.estado || 'Programada');
      const [procesos, setProcesos] = useState<Proceso[]>([]);
      const [editarproceso, setEditarProceso] = useState<Proceso[]>([])
      
            // const editar_proceso = async () => {
            //   try {
            //     const baseurl = getBaseUrl();
            //     const editar_processo = await axios.put(`${baseurl}/procesos/${agendaData.id_agenda}`, {
                
            //   } catch (error) {
                
            //   }
            // }
            // }
    
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
      return {
        selectedProceso,
        setSelectedProceso,
        selectedStatus,
        setSelectedStatus,
        procesos,
        setProcesos,
        lista_procesos,
        handleStatusChange,
      }
}

export default AbogadoEditarAgendaViewModel;
