import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Note {
  id: string;
  date: string;
  status: string;
  content: string;
}

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{note.date}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(note.status) }
        ]}>
          <Text style={styles.statusText}>{note.status}</Text>
        </View>
      </View>
      <Text style={styles.content}>{note.content}</Text>
      <TouchableOpacity style={styles.viewButton}>
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

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// interface Note {
//   id: string;
//   date: string;
//   status: string;
//   content: string;
// }

// interface NoteCardProps {
//   note: Note;
// }

// const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.date}>{note.date}</Text>
//         <Text style={styles.status}>{note.status}</Text>
//       </View>
//       <Text style={styles.content}>{note.content}</Text>
//       <TouchableOpacity style={styles.viewButton}>
//         <Text style={styles.viewButtonText}>Ver</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   date: {
//     fontSize: 14,
//     color: '#666',
//   },
//   status: {
//     fontSize: 14,
//     color: '#1E88E5',
//     fontWeight: '600',
//   },
//   content: {
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   viewButton: {
//     alignSelf: 'flex-end',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 4,
//   },
//   viewButtonText: {
//     color: '#333',
//   },
// });

// export default NoteCard;

