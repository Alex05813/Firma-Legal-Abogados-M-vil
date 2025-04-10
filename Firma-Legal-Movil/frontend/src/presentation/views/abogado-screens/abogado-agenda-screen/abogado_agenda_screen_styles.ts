import { StyleSheet } from "react-native";

export const AbogadoAgendaScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 16,
      },
      mesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    botonMes: {
        padding: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 5,
    },
    textoMes: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#495057',
    },
      numeroDiaText: {
        fontSize: 12,
        color: '#495057',
        textAlign: 'center', // Centra el número debajo de la inicial
    },
      header: {
        marginTop: 40,
        marginBottom: 20,
        width: '100%',
      },
      backButtonContainer: {
        position: 'absolute', // Posiciona el botón "Volver" absolutamente
        left: 0,
        top: 0,
        zIndex: 1, // Asegura que esté por encima del título
      },
      backButton: {
        fontSize: 16,
        color: '#007AFF',
      },
      titleContainer: {
        alignItems: 'center', // Centra el título y la fecha
        marginTop: 24, // Espacio debajo del botón "Volver"
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
      },
      date: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 4,
      },
      diasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      diaItem: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#e9ecef',
      },
      diaText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#495057',
      },
      scrollContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 10,
      },
    citaCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      filaSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      hora: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E3A8A',
      },
      fecha: {
        fontSize: 14,
        color: '#64748B',
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      descripcion: {
        fontSize: 14,
        color: '#334155',
        marginBottom: 12,
        lineHeight: 20,
      },
      filaEstado: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Para alinear a la derecha
      },
      estadoBadge: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 12,
      },
      estadoCancelada: {
        backgroundColor: '#FEE2E2',
      },
      estadoCompletada: {
        backgroundColor: '#D1FAE5',
      },
      estadoText: {
        fontSize: 12,
        fontWeight: '600',
      },
      
      pendiente: {
        backgroundColor: '#ffc107', // Amarillo para pendientes
      },
      completada: {
        backgroundColor: '#28a745', // Verde para completadas
      },
      addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#007AFF',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
      addButtonText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
      },
      calendarIcon:{
        width: 30,
        height: 30,
      },
      
});