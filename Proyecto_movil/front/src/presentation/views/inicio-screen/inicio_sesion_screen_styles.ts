    import { StyleSheet } from "react-native";

export const InicioSesionScreen = StyleSheet.create({
    principal: {
        padding: 10,
    },

    backgroundImage: {
        width: '100%',
        height: 250, // Ajusta la altura según sea necesario
        top: 50,
        left: 0,
    },

    problemButton: {
        marginTop: 220, // Ajusta la posición del botón
        marginBottom: 20,
    },

    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        marginTop: 25,
        paddingLeft: 30,
        marginRight: 20,
        marginLeft: 20,
    },

    newsSection: {
        padding: 10,
    },

    txtnotice: {
        marginBottom: 15,
    },

    newsTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white', // Color de fondo del panel
        marginTop: 25,
        marginBottom: 25,
        position: 'relative', // Añade esto para que el menú sea relativo al header
    },
    logoicon: {
        width: 30,
        height: 30,
        marginRight: 25
    },
    menuIcon: {
        width: 30,
        height: 30,
    },

    menuOptions: {
        position: 'absolute',
        top: 40, // Ajusta según la posición del header
        right: 40,
        left: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 1000, // Asegura que el menú esté por encima de otros elementos
    },
    menuOptionText: {
        fontSize: 16,
        paddingVertical: 8,
    },

    // Nuevos estilos
    mainImage: {
        width: '100%',
        height: 200,
        top: '50%',
        resizeMode: 'cover',
        marginBottom: 20,
    },
    discoverMoreText: {
        textAlign: 'center',
        marginTop: 200,
        fontSize: 18,
        fontWeight: 'bold',
    },
    discoverMoreIcon: {
        alignSelf: 'center',
        marginTop: 10,
        width: 30,
        height: 30,
    },

    textoimagen:{
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        marginBottom: 20,
        backgroundColor: 'white',
        opacity: 0.7,
    }
});