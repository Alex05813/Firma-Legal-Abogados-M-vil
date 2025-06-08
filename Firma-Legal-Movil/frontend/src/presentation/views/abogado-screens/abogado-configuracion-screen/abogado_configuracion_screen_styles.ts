import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const AbogadoConfiguracionScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  // Estilos del Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  backButtonContainer: {
    padding: 8,
  },
  
  backButton: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginRight: 40, // Compensa el espacio del botón volver
  },
  
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginRight: 10,
  },
  
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A90E2',
  },
  
  // Estilos del ScrollView
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Estilos de las Secciones
  section: {
    marginTop: 25,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  
  // Estilos del Perfil de Usuario
  perfilCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  
  avatarContainer: {
    marginRight: 15,
  },
  
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E8EB',
  },
  
  userInfo: {
    flex: 1,
  },
  
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  
  userEmail: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  
  userRole: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '600',
  },
  
  editButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Estilos de las Opciones
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  
  iconImage: {
    width: 20,
    height: 20,
    tintColor: '#4A90E2',
  },
  
  optionText: {
    flex: 1,
  },
  
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  
  optionDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  
  arrowText: {
    fontSize: 20,
    color: '#BDC3C7',
    fontWeight: '300',
  },
  
  // Estilos del Botón de Cerrar Sesión
  logoutButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Espacio adicional
  bottomSpacing: {
    height: 30,
  },
  
  // Estilos para tema oscuro (opcional)
  darkContainer: {
    backgroundColor: '#1A1A1A',
  },
  
  darkHeader: {
    backgroundColor: '#2C2C2C',
    borderBottomColor: '#3C3C3C',
  },
  
  darkTitle: {
    color: '#FFFFFF',
  },
  
  darkSectionTitle: {
    color: '#FFFFFF',
  },
  
  darkCard: {
    backgroundColor: '#2C2C2C',
  },
  
  darkText: {
    color: '#FFFFFF',
  },
  
  darkSubText: {
    color: '#CCCCCC',
  },
});