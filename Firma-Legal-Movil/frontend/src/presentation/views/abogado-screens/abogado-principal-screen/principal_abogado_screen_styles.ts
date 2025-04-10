
import { StyleSheet } from "react-native";

export const AbogadoPrincialScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#4a90e2',
      },
      greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      subtitle: {
        fontSize: 14,
        color: '#666',
      },
      menuButton: {
        padding: 10,
      },
      menuIcon: {
        fontSize: 24,
        color: '#4a90e2',
        fontWeight: 'bold',
      },
      menuOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 10,
      },
      menuPanel: {
        position: 'absolute',
        top: 80,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: '60%',
        zIndex: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      menuItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      menuItemText: {
        fontSize: 16,
        color: '#333',
      },
      summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      summaryCapsule: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      alertCapsule: {
        backgroundColor: '#fff8f8',
        borderColor: '#ffdddd',
        borderWidth: 1,
      },
      capsuleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      capsuleSubtitle: {
        fontSize: 14,
        color: '#666',
      },
      section: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      },
      emptyState: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
      },
      processButton: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
      },
      processButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 22,
      },
      filesContainer: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
      },
      filesTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#555',
      },
      fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      fileIcon: {
        fontSize: 24,
        marginRight: 10,
      },
      fileInfo: {
        flex: 1,
      },
      fileName: {
        color: '#333',
      },
      fileSize: {
        fontSize: 12,
        color: '#666',
      },
      divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 20,
      },
      statsContainer: {
        marginLeft: -10,
      },
      checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 5,
      },
      checkboxText: {
        fontWeight: 'normal',
        color: '#333',
      },
      infoText: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
      },
      imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
      },
      decorativeImage: {
        width: '48%',
        height: 100,
        borderRadius: 8,
      },
      // Modal Styles
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
      },
      alertModalContent: {
        backgroundColor: '#fff8f8',
        borderColor: '#ffdddd',
        borderWidth: 1,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
      },
      taskItem: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      taskDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
      },
      taskDueDate: {
        fontSize: 13,
        color: '#4a90e2',
        fontStyle: 'italic',
      },
      alertItem: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ffdddd',
      },
      alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d32f2f',
      },
      alertMessage: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
      },
      alertPriorityhigh: {
        fontSize: 13,
        color: '#d32f2f',
        fontWeight: 'bold',
      },
      alertPrioritymedium: {
        fontSize: 13,
        color: '#ffa000',
        fontWeight: 'bold',
      },
      alertPrioritylow: {
        fontSize: 13,
        color: '#388e3c',
        fontWeight: 'bold',
      },
      closeButton: {
        backgroundColor: '#4a90e2',
        padding: 12,
        borderRadius: 5,
        marginTop: 15,
      },
      alertCloseButton: {
        backgroundColor: '#d32f2f',
      },
      closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
      },
})