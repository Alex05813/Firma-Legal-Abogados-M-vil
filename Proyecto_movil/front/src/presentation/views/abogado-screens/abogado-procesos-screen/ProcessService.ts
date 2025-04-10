import axios from 'axios';

const API_URL = 'http://192.168.20.27:9000/api/procesos'; 

export const ProcessService = {
  // Obtener todos los procesos
  async getAllProcesses() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching processes:', error);
      throw error;
    }
  },

  // Obtener un proceso específico por ID
  async getProcessById(id_proceso: number) {
    try {
      const response = await axios.get(`${API_URL}/${id_proceso}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching process ${id_proceso}:`, error);
      throw error;
    }
  },

  // Buscar procesos por ID de cliente
  async getProcessesByClientId(numeroIdentificacionCliente: string) {
    try {
      const response = await axios.get(`${API_URL}/${numeroIdentificacionCliente}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching processes for client ${numeroIdentificacionCliente}:`, error);
      throw error;
    }
  },

  // Actualizar un proceso
  async updateProcess(id_proceso: number, processData: any) {
    try {
      const response = await axios.put(`${API_URL}/${id_proceso}`, processData);
      return response.data;
    } catch (error) {
      console.error(`Error updating process ${id_proceso}:`, error);
      throw error;
    }
  }
};

//Cambie la pantalla de NewCaseScreen ya que desde la app Movil no se podran crear casos

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../../../../App';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// // import DateTimePicker from '@react-native-community/datetimepicker';

// type NewCaseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewCaseScreen'>;

// interface NewCaseScreenProps {
//   navigation: NewCaseScreenNavigationProp;
// }

// const NewCaseScreen: React.FC<NewCaseScreenProps> = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     client: '',
//     category: '',
//     description: '',
//     priority: 'Normal',
//     startDate: new Date(),
//     court: '',
//   });

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [categories] = useState([
//     'Laboral', 'Civil', 'Penal', 'Familia', 'Comercial', 'Administrativo'
//   ]);
//   const [priorities] = useState([
//     'Normal', 'Alta', 'Urgente'
//   ]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({
//       ...formData,
//       [field]: value
//     });
//   };

//   // const handleDateChange = (event: any, selectedDate?: Date) => {
//   //   setShowDatePicker(false);
//   //   if (selectedDate) {
//   //     setFormData({
//   //       ...formData,
//   //       startDate: selectedDate
//   //     });
//   //   }
//   // };

//   const handleSubmit = () => {
//     // Aquí iría la lógica para guardar el nuevo caso
//     console.log('Nuevo caso:', formData);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#6b89b3" barStyle="light-content" />
      
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Icon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Nuevo Caso</Text>
//         <View style={{ width: 24 }} /> {/* Espacio para alinear el título */}
//       </View>

//       <ScrollView contentContainerStyle={styles.content}>
//         {/* Información básica */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Información Básica</Text>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Título del caso</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Ej: Demanda laboral por despido injustificado"
//               value={formData.title}
//               onChangeText={(text) => handleInputChange('title', text)}
//             />
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Cliente</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Nombre del cliente"
//               value={formData.client}
//               onChangeText={(text) => handleInputChange('client', text)}
//             />
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Categoría</Text>
//             <View style={styles.optionsContainer}>
//               {categories.map(category => (
//                 <TouchableOpacity
//                   key={category}
//                   style={[
//                     styles.optionButton,
//                     formData.category === category && styles.optionButtonActive
//                   ]}
//                   onPress={() => handleInputChange('category', category)}
//                 >
//                   <Text style={[
//                     styles.optionText,
//                     formData.category === category && styles.optionTextActive
//                   ]}>
//                     {category}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Prioridad</Text>
//             <View style={styles.priorityContainer}>
//               {priorities.map(priority => (
//                 <TouchableOpacity
//                   key={priority}
//                   style={[
//                     styles.priorityButton,
//                     formData.priority === priority && styles.priorityButtonActive,
//                     { backgroundColor: getPriorityColor(priority, formData.priority === priority) }
//                   ]}
//                   onPress={() => handleInputChange('priority', priority)}
//                 >
//                   <Text style={[
//                     styles.priorityText,
//                     formData.priority === priority && styles.priorityTextActive
//                   ]}>
//                     {priority}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </View>

//         {/* Fecha y tribunal */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Fechas y Tribunal</Text>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Fecha de inicio</Text>
//             <TouchableOpacity 
//               style={styles.dateInput} 
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Icon name="event" size={20} color="#6b89b3" style={styles.inputIcon} />
//               <Text style={styles.dateText}>
//                 {formData.startDate.toLocaleDateString('es-ES')}
//               </Text>
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.inputLabel}>Tribunal</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Juzgado o tribunal competente"
//               value={formData.court}
//               onChangeText={(text) => handleInputChange('court', text)}
//             />
//           </View>
//         </View>

//         {/* Descripción */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Descripción del Caso</Text>
//           <TextInput
//             style={[styles.input, styles.descriptionInput]}
//             placeholder="Describa los detalles del caso..."
//             value={formData.description}
//             onChangeText={(text) => handleInputChange('description', text)}
//             multiline
//             numberOfLines={4}
//           />
//         </View>
//       </ScrollView>

//       {/* Botón de guardar */}
//       <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
//         <Text style={styles.saveButtonText}>Guardar Caso</Text>
//       </TouchableOpacity>

//       {/* DatePicker */}
//       {/* {showDatePicker && (
//         <DateTimePicker
//           value={formData.startDate}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       )} */}
//     </View>
//   );
// };

// // Función auxiliar para colores de prioridad
// const getPriorityColor = (priority: string, isActive: boolean) => {
//   if (!isActive) return '#f0f0f0';
//   switch(priority) {
//     case 'Alta': return '#ff6b6b';
//     case 'Urgente': return '#ff0000';
//     default: return '#6b89b3';
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f7fa',
//   },
//   header: {
//     backgroundColor: '#6b89b3',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     padding: 4,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: 'white',
//   },
//   content: {
//     padding: 20,
//     paddingBottom: 100,
//   },
//   section: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#6b89b3',
//     marginBottom: 16,
//     paddingBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 16,
//     color: '#444',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 14,
//     fontSize: 16,
//     color: '#333',
//     backgroundColor: '#fafafa',
//   },
//   descriptionInput: {
//     height: 120,
//     textAlignVertical: 'top',
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },
//   optionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     marginRight: 8,
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   optionButtonActive: {
//     backgroundColor: '#6b89b3',
//     borderColor: '#6b89b3',
//   },
//   optionText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   optionTextActive: {
//     color: 'white',
//   },
//   priorityContainer: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },
//   priorityButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   priorityButtonActive: {
//     borderColor: 'transparent',
//   },
//   priorityText: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   priorityTextActive: {
//     color: 'white',
//   },
//   dateInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 14,
//     backgroundColor: '#fafafa',
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   saveButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#6b89b3',
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#6b89b3',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default NewCaseScreen;