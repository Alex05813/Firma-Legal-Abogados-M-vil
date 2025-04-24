import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: string;
  hora_inicio?: string;
  hora_fin?: string;
  todo_el_dia?: boolean;
  vincular_expediente?: boolean;
  asociar_directorios?: boolean;
  asignado_a?: string;
  creado_por?: string;
}

interface NoteCardProps {
  note: Tarea;
}

type NoteCardNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoDetalleTareaScreen'>;

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const navigation = useNavigation<NoteCardNavigationProp>();
  
  // Formatear fecha a formato local (ej: "20/04/2025")
  const formattedDate = new Date(note.fecha).toLocaleDateString('es-ES');

  const handleViewDetails = () => {
    navigation.navigate('AbogadoDetalleTareaScreen', { 
      tarea: note 
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{formattedDate}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(note.estado) }
        ]}>
          <Text style={styles.statusText}>{note.estado}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{note.titulo}</Text>
      <Text 
        style={styles.content}
        numberOfLines={2} // Mostrar solo 2 líneas de descripción
        ellipsizeMode="tail" // Puntos suspensivos si el texto es muy largo
      >
        {note.descripcion}
      </Text>
      
      <TouchableOpacity 
        style={styles.viewButton}
        onPress={handleViewDetails}
      >
        <Text style={styles.viewButtonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Pendiente': return '#ffb74d';
    case 'En progreso': return '#64b5f6';
    case 'Resultado': return '#81c784';
    case 'En revisión': return '#ba68c8';
    default: return '#6b89b3';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: '#6b89b3',
    fontFamily: 'sans-serif-medium',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    lineHeight: 22,
  },
  viewButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#6b89b3',
    borderRadius: 20,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default NoteCard;