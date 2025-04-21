

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importes de los screens publicos
import InicioSesionScreen from './src/presentation/views/inicio-screen/InicioSesionScreen';
import crudscreen from './src/presentation/views/crud/crud_screen';
import crudedit from './src/presentation/views/crud/crud-edit/crudedit';

// Importes de los Screens del cliente
import ClientePrincipalScreen from './src/presentation/views/cliente-screens/cliente-principal-screen/ClientePrincipalScreen';
import ClienteAgendaScreen from './src/presentation/views/cliente-screens/cliente-agenda-screen/ClienteAgendaScreen';

// Importes de los screens del abogado
import AbogadoPrincipalScreen from './src/presentation/views/abogado-screens/abogado-principal-screen/AbogadoPrincipalScreen';
import AbogadoAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-principal-agenda-screen/AbogadoAgendaScreen';
import AbogadoFacturaScreen from './src/presentation/views/abogado-screens/abogado-factura-screen/AbogadoFacturaScreen';
import AbogadoTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/AbogadoTareaScreen';
import AbogadoNuevaTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/abogado-nueva-tarea-screen/AbogadoNuevaTareaScreen';
import AbogadoProcesosScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/AbogadoProcesosScreen';
import AbogadoDetallesProcesoScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/abogado-detalles-proceso-screen/AbogadoDetallesProcesosScreen';
import AbogadoNuevaAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-nueva-agenda-screen/AbogadoNuevaAgendaScreen';
import AbogadoEditarAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-editar-agenda-screen/AbogadoEditarAgendaScreen';


export type RootStackParamList = {
  

  // Variables Publicas.
  InicioSesionScreen: undefined;
  crudscreen: undefined;
  crudedit: {
    agendaData: {
      id_agenda: number;
      fecha: string | Date;
      hora: string;
      estado: string;
      descripcion: string;
      procesoDescripcion?: string;
    }
  }

  // Variables Clientes.
  ClientePrincipalScreen: undefined;
  ClienteAgendaScreen: undefined;

  // Variables Abogado.
  AbogadoPrincipalScreen: {
    numIdentificacion: string; // ¡Añade esta línea!
  };
    AbogadoAgendaScreen: {
      numIdentificacion2: string; // Parametro para la busqueda de citas
    }

  AbogadoFacturaScreen: undefined;
  AbogadoNuevaAgendaScreen: undefined;
  AbogadoTareaScreen: undefined;
  AbogadoNuevaTareaScreen: undefined;
  AbogadoProcesosScreen: undefined;
  AbogadoDetallesProcesoScreen: undefined;
  AbogadoEditarAgendaScreen: {
    agendaData: {
      id_agenda: number;
      fecha: string | Date;
      hora: string;
      estado: string;
      descripcion: string;
      procesoDescripcion?: string;
      id_proceso?: number; // Asegúrate de que este campo sea opcional
    }
  };
};

const Stack = createNativeStackNavigator <RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >


        {/*_________SCREENS PUBLICOS_________*/}

        {/* Pagina principal */}
        <Stack.Screen 
        name="InicioSesionScreen" 
        component={InicioSesionScreen} 
        />

        {/* Pagina principal */}
        <Stack.Screen 
        name="crudscreen" 
        component={crudscreen} 
        />

        {/* Pagina principal */}
        <Stack.Screen 
        name="crudedit" 
        component={crudedit} 
        />
        

        {/*_________SCREENS DEL CLIENTE_________*/}

        {/* Pagina Principal del cliente*/}
        <Stack.Screen
          name="ClientePrincipalScreen"
          component={ClientePrincipalScreen}
        />

        {/* Pagina de agenda del cliente*/}
        <Stack.Screen
          name="ClienteAgendaScreen"
          component={ClienteAgendaScreen}
        />


        

        {/*_________SCREENS DEL ABOGADO_________*/}

        {/* Pagina principal del abogado*/}
        <Stack.Screen
          name="AbogadoPrincipalScreen"
          component={AbogadoPrincipalScreen}
        />

        {/* Pagina de agenda del abogado*/}
        <Stack.Screen
          name="AbogadoAgendaScreen"
          component={AbogadoAgendaScreen}
        />

        {/* Pagina de facturacion del abogado*/}
        <Stack.Screen
          name="AbogadoFacturaScreen"
          component={AbogadoFacturaScreen}
        />

        {/* Pagina para crear una nueva agenda del abogado*/}
        <Stack.Screen
          name="AbogadoTareaScreen"
          component={AbogadoTareaScreen}
        />

        {/* Pagina para crear una nueva agenda del abogado*/}
        <Stack.Screen
          name="AbogadoNuevaTareaScreen"
          component={AbogadoNuevaTareaScreen}
        />

        {/* Screen para mirar los procesos del abogado*/}
        <Stack.Screen
          name="AbogadoProcesosScreen"
          component={AbogadoProcesosScreen}
        />

        {/* Screen para mirar los detalles de un proceso del abogado*/}
        <Stack.Screen
          name="AbogadoDetallesProcesoScreen"
          component={AbogadoDetallesProcesoScreen}
        />

        {/* Screen para crear una nueva cita*/}
        <Stack.Screen
          name="AbogadoNuevaAgendaScreen"
          component={AbogadoNuevaAgendaScreen}
        />

        {/* Screen para crear una nueva cita*/}
        <Stack.Screen
          name="AbogadoEditarAgendaScreen"
          component={AbogadoEditarAgendaScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
