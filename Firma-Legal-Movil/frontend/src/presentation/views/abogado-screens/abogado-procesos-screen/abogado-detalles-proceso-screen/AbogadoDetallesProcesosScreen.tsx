import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CaseDetailScreenRouteProp = RouteProp<RootStackParamList, 'AbogadoDetallesProcesoScreen'>;
type CaseDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AbogadoDetallesProcesoScreen'>;

interface CaseDetailScreenProps {
  route: CaseDetailScreenRouteProp;
  navigation: CaseDetailScreenNavigationProp;
}

const AbogadoDetallesProcesoScreen: React.FC<CaseDetailScreenProps> = ({ route, navigation }) => {
//   const { caseId } = route.params;

  // Datos de ejemplo (en una app real vendrían de tu API o estado)
  const caseDetails = {
    // id: caseId,
    title: "Demanda Laboral por Despido Injustificado",
    client: "Empresa XYZ S.A.",
    status: "En progreso",
    category: "Laboral",
    priority: "Alta",
    startDate: "15/04/2025",
    nextHearing: "22/04/2025 10:00 AM",
    court: "Juzgado Laboral N°3",
    judge: "Dra. María González",
    description: "El cliente alega despido injustificado después de 5 años de servicio. Buscamos indemnización máxima según ley laboral.",
    documents: ["Demanda.pdf", "Contrato.pdf", "Pruebas.pdf"],
    tasks: [
      { id: 1, title: "Preparar alegatos", completed: false },
      { id: 2, title: "Revisar pruebas", completed: true },
      { id: 3, title: "Preparar testigos", completed: false },
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Alta': return '#ff6b6b';
      case 'Urgente': return '#ff0000';
      case 'Media': return '#feca57';
      default: return '#1dd1a1';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pendiente': return '#ff9ff3';
      case 'En progreso': return '#48dbfb';
      case 'En revisión': return '#feca57';
      case 'Finalizado': return '#1dd1a1';
      default: return '#6b89b3';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6b89b3" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Caso</Text>
        <View style={{ width: 24 }} /> {/* Espacio para alinear el título */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Encabezado del caso */}
        <View style={styles.caseHeader}>
          <View style={styles.caseIdContainer}>
            {/* <Text style={styles.caseId}>Caso #{caseDetails.id}</Text> */}
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(caseDetails.priority) }]}>
              <Text style={styles.priorityText}>{caseDetails.priority}</Text>
            </View>
          </View>
          <Text style={styles.caseTitle}>{caseDetails.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(caseDetails.status) }]}>
            <Text style={styles.statusText}>{caseDetails.status}</Text>
          </View>
        </View>

        {/* Información básica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Caso</Text>
          <DetailRow icon="person" title="Cliente" value={caseDetails.client} />
          <DetailRow icon="category" title="Categoría" value={caseDetails.category} />
          <DetailRow icon="event" title="Fecha Inicio" value={caseDetails.startDate} />
          <DetailRow icon="gavel" title="Próxima Audiencia" value={caseDetails.nextHearing} />
          <DetailRow icon="account-balance" title="Tribunal" value={caseDetails.court} />
          <DetailRow icon="person-pin" title="Juez" value={caseDetails.judge} />
        </View>

        {/* Descripción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>{caseDetails.description}</Text>
        </View>

        {/* Documentos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentos ({caseDetails.documents.length})</Text>
          {caseDetails.documents.map((doc, index) => (
            <TouchableOpacity key={index} style={styles.documentItem}>
              <Icon name="description" size={20} color="#6b89b3" style={styles.documentIcon} />
              <Text style={styles.documentName}>{doc}</Text>
              <Icon name="download" size={20} color="#6b89b3" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tareas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tareas ({caseDetails.tasks.length})</Text>
          {caseDetails.tasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <TouchableOpacity style={styles.taskCheckbox}>
                <Icon 
                  name={task.completed ? "check-box" : "check-box-outline-blank"} 
                  size={24} 
                  color={task.completed ? "#6b89b3" : "#ccc"} 
                />
              </TouchableOpacity>
              <Text style={[styles.taskText, task.completed && styles.completedTask]}>{task.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Icon name="edit" size={20} color="#6b89b3" />
          <Text style={[styles.buttonText, { color: '#6b89b3' }]}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
          <Icon name="event-note" size={20} color="white" />
          <Text style={[styles.buttonText, { color: 'white' }]}>Agregar Evento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Componente auxiliar para filas de detalle
const DetailRow = ({ icon, title, value }: { icon: string, title: string, value: string }) => (
  <View style={styles.detailRow}>
    <Icon name={icon} size={20} color="#6b89b3" style={styles.detailIcon} />
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#6b89b3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  caseHeader: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  caseIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseId: {
    fontSize: 16,
    color: '#6b89b3',
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  caseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    lineHeight: 26,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b89b3',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  documentIcon: {
    marginRight: 12,
  },
  documentName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskCheckbox: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#6b89b3',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6b89b3',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AbogadoDetallesProcesoScreen;