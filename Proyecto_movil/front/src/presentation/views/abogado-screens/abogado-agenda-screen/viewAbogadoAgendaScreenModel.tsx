import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios'

// Definir la interfaz para las agendas
interface Agenda {
    _id: string;
    id_agenda: number;
    fecha: string;
    hora: string;
    descripcion: string;
    estado: string;
    id_proceso: string;
    createdAt: string;
    updatedAt: string;
  }

const AbogadoAgendaViewModel = () => {
    const [agendas, setAgendas] = useState<Agenda[]>([]); // Tipar el estado con la interfaz Agenda
      const [error, setError] = useState<string | null>(null);
      const [mesActual, setMesActual] = useState(new Date().getMonth()); // Estado para el mes actual
    
        useEffect(() => {
          const fetchAgendas = async () => {
              try {
                  const response = await axios.get('http://192.168.20.27:9000/api/agendas');
                  setAgendas(response.data); // Almacena las agendas en el estado
              } catch (error) {
                  console.error('Error al obtener las agendas:', error);
              }
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
