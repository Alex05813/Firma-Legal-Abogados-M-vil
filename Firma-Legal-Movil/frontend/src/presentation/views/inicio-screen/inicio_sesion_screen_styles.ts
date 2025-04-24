    import { StyleSheet } from "react-native";

export const InicioSesionScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
      },
      logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 20,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
      },
      label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        marginBottom: 5,
      },
      input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 15,
      },
      button: {
        width: '100%',
        backgroundColor: '#6b87b7',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
      or: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
      },
      socialButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
      },
      icon: {
        marginRight: 10,
      },
      socialButtonText: {
        fontSize: 16,
      },
      policyText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
      },
      telegramButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
      },
      disabledButton: {
        backgroundColor: '#cccccc',
      },
});