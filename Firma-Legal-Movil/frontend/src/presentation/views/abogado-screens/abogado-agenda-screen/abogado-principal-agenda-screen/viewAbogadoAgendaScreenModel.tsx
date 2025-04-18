import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { getBaseUrl } from '../../../../../domain/services/getBaseUrl';// Definir la interfaz para las agendas
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';
import { useNavigation } from '@react-navigation/native';

interface Agenda {
    _id: string;
    id_agenda: number;
    fecha: string;
    hora: string;
    descripcion: string;
    estado: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    numeroIdentificacionAbogado?: string;
    numeroIdentificacionCliente?: string;
    procesoDescripcion?: string;
  }

  type AbogadoAgendaRouteProp = RouteProp<RootStackParamList, 'AbogadoAgendaScreen'>;
  

const AbogadoAgendaViewModel = () => {
    const route = useRoute<AbogadoAgendaRouteProp>();
    const { numIdentificacion2 } = route.params; // Extrae el parámetro


    const [agendas, setAgendas] = useState<Agenda[]>([]); // Tipar el estado con la interfaz Agenda
      const [error, setError] = useState<string | null>(null);
      const [mesActual, setMesActual] = useState(new Date().getMonth()); // Estado para el mes actual
    
        useEffect(() => {
          console.log('numero de identificacion del view:', numIdentificacion2); // Verifica el valor del parámetro
          
          const fetchAgendas = async () => {
              try {
                const baseUrl = getBaseUrl();
                  const response = await axios.get(`${baseUrl}/agendas/abogado/${numIdentificacion2}`); // Cambia la URL según tu API
                  setAgendas(response.data.agendasConProceso || []);                   
                  // Verifica la estructura de response.data
                  console.log('Respuesta completa:', response.data);                  

                  // Asegúrate de que estás extrayendo correctamente las agendas
                  const agendasData = response.data.agendasConProceso || response.data || [];
                  setAgendas(agendasData);
              } catch (error) {
                console.error('Error al obtener las agendas:', error);
                setError("Error al cargar citas");              }
          };
      
          fetchAgendas(); 
      }, []);

      const incrementarMes = () => {
        setMesActual((prevMes) => (prevMes + 1) % 12); // Avanza al siguiente mes
    };
    
    
    const decrementarMes = () => {
        setMesActual((prevMes) => (prevMes - 1 + 12) % 12); // Retrocede al mes anterior
    };
    
    
    // Obtener el nombre del mes
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const nombreMesActual = meses[mesActual];
    
    
        const diasSemana = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
        const numerosDias = [26, 27, 28, 29, 30, 31, 1]; // Cambia estos números según el mes actual
        const fechaActual = new Date();
        const dia = fechaActual.getDate() + ' de ' + meses[fechaActual.getMonth()] + ' ' + fechaActual.getFullYear(); // Formato: 26 de Septiembre de 2023
        const mes = meses[fechaActual.getMonth()] ; // Los meses son 0-indexados
  return {
    incrementarMes,
    decrementarMes,
    nombreMesActual,
    diasSemana,
    numerosDias,
    fechaActual,
    mes,
    agendas,
    error,
    dia,
  };

}

export default AbogadoAgendaViewModel
