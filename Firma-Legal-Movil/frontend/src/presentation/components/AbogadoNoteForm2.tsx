import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface NoteFormProps {
  onSubmit: (note: { title: string; description: string }) => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [linkFile, setLinkFile] = useState(false);
  const [assignee, setAssignee] = useState('');
  const [associateDirectories, setAssociateDirectories] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nueva Tarea</Text>
        <View style={styles.headerLine} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalles Principales</Text>
        <TextInput
          style={styles.input}
          placeholder="Título de la tarea"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Descripción detallada..."
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        
        <View style={styles.dateContainer}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Inicio</Text>
            <Text style={styles.dateValue}>31 Mar 2025</Text>
            <Text style={styles.timeValue}>07:55 AM</Text>
          </View>
          
          <View style={styles.dateSeparator} />
          
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Final</Text>
            <Text style={styles.dateValue}>31 Mar 2025</Text>
            <Text style={styles.timeValue}>08:55 AM</Text>
          </View>
        </View>
        
        <View style={styles.optionsContainer}>
          <TouchableOption 
            label="Todo el día"
            active={allDay}
            onPress={() => setAllDay(!allDay)}
          />
          <TouchableOption 
            label="Vincular expediente"
            active={linkFile}
            onPress={() => setLinkFile(!linkFile)}
          />
          <TouchableOption 
            label="Asociar Directorios"
            active={associateDirectories}
            onPress={() => setAssociateDirectories(!associateDirectories)}
          />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Asignar a..."
          placeholderTextColor="#aaa"
          value={assignee}
          onChangeText={setAssignee}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.submitButton]} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Crear Tarea</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TouchableOption = ({ label, active, onPress }: { label: string, active: boolean, onPress: () => void }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={[styles.optionCheckbox, active && styles.optionCheckboxActive]}>
      {active && <Text style={styles.optionCheckmark}>✓</Text>}
    </View>
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#6b89b3',
    marginBottom: 8,
  },
  headerLine: {
    height: 3,
    width: 60,
    backgroundColor: '#6b89b3',
    borderRadius: 3,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b89b3',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f7fa',
    borderRadius: 8,
  },
  dateSeparator: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: 14,
    color: '#6b89b3',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timeValue: {
    fontSize: 14,
    color: '#666',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCheckboxActive: {
    backgroundColor: '#6b89b3',
    borderColor: '#6b89b3',
  },
  optionCheckmark: {
    color: 'white',
    fontSize: 14,
  },
  optionLabel: {
    fontSize: 16,
    color: '#444',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 12,
  },
  submitButton: {
    backgroundColor: '#6b89b3',
    shadowColor: '#6b89b3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default NoteForm;

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// interface NoteFormProps {
//   onSubmit: (note: { title: string; description: string }) => void;
//   onCancel: () => void;
// }

// const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onCancel }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [allDay, setAllDay] = useState(false);
//   const [linkFile, setLinkFile] = useState(false);
//   const [assignee, setAssignee] = useState('');
//   const [associateDirectories, setAssociateDirectories] = useState(false);

//   const handleSubmit = () => {
//     onSubmit({
//       title,
//       description,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Volver</Text>
//       <Text style={styles.subHeader}>Alerta</Text>
//       <Text style={styles.subHeader}>Tarea</Text>
      
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Pendiente</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Título"
//           value={title}
//           onChangeText={setTitle}
//         />
//         <TextInput
//           style={[styles.input, styles.descriptionInput]}
//           placeholder="Descripción"
//           value={description}
//           onChangeText={setDescription}
//           multiline
//         />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Tareas Generales</Text>
        
//         <View style={styles.dateRow}>
//           <Text style={styles.dateLabel}>Fecha inicio</Text>
//           <Text style={styles.dateValue}>31 marzo 2025 | 07:55 AM</Text>
//         </View>
        
//         <View style={styles.dateRow}>
//           <Text style={styles.dateLabel}>Fecha final</Text>
//           <Text style={styles.dateValue}>31 marzo 2025 | 08:55 AM</Text>
//         </View>
        
//         <View style={styles.checkboxRow}>
//           <TouchableOpacity 
//             style={[styles.checkbox, allDay && styles.checked]} 
//             onPress={() => setAllDay(!allDay)}
//           >
//             {allDay && <Text style={styles.checkmark}>✓</Text>}
//           </TouchableOpacity>
//           <Text style={styles.checkboxLabel}>¿Todo el día?</Text>
//         </View>
        
//         <View style={styles.checkboxRow}>
//           <TouchableOpacity 
//             style={[styles.checkbox, linkFile && styles.checked]} 
//             onPress={() => setLinkFile(!linkFile)}
//           >
//             {linkFile && <Text style={styles.checkmark}>✓</Text>}
//           </TouchableOpacity>
//           <Text style={styles.checkboxLabel}>Vincular expediente</Text>
//         </View>
        
//         <TextInput
//           style={styles.input}
//           placeholder="Alexander Perdomo"
//           value={assignee}
//           onChangeText={setAssignee}
//         />
        
//         <View style={styles.checkboxRow}>
//           <TouchableOpacity 
//             style={[styles.checkbox, associateDirectories && styles.checked]} 
//             onPress={() => setAssociateDirectories(!associateDirectories)}
//           >
//             {associateDirectories && <Text style={styles.checkmark}>✓</Text>}
//           </TouchableOpacity>
//           <Text style={styles.checkboxLabel}>Asociar Directorios</Text>
//         </View>
//       </View>
      
//       <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
//         <Text style={styles.createButtonText}>Crear evento</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
//         <Text style={styles.cancelButtonText}>Cancelar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   subHeader: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   section: {
//     marginTop: 16,
//     marginBottom: 16,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 4,
//     padding: 12,
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   descriptionInput: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   dateRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   dateLabel: {
//     fontSize: 16,
//     color: '#666',
//   },
//   dateValue: {
//     fontSize: 16,
//     color: '#333',
//   },
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 4,
//     marginRight: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checked: {
//     backgroundColor: '#1E88E5',
//     borderColor: '#1E88E5',
//   },
//   checkmark: {
//     color: 'white',
//     fontSize: 12,
//   },
//   checkboxLabel: {
//     fontSize: 16,
//     color: '#333',
//   },
//   createButton: {
//     backgroundColor: '#1E88E5',
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   createButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     padding: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   cancelButtonText: {
//     color: '#333',
//     fontSize: 16,
//   },
// });

// export default NoteForm;