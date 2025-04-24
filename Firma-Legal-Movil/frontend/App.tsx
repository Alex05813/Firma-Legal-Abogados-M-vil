

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importes de los screens publicos
import InicioSesionScreen from './src/presentation/views/inicio-screen/InicioSesionScreen';

// Importes de los Screens del cliente
import ClientePrincipalScreen from './src/presentation/views/cliente-screens/cliente-principal-screen/ClientePrincipalScreen';
import ClienteAgendaScreen from './src/presentation/views/cliente-screens/cliente-agenda-screen/ClienteAgendaScreen';

// Importes de los screens del abogado
import AbogadoPrincipalScreen from './src/presentation/views/abogado-screens/abogado-principal-screen/AbogadoPrincipalScreen';
import AbogadoAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-principal-agenda-screen/AbogadoAgendaScreen';
import AbogadoTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/AbogadoTareaScreen';
import AbogadoNuevaTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/abogado-nueva-tarea-screen/AbogadoNuevaTareaScreen';
import AbogadoProcesosScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/AbogadoProcesosScreen';
import AbogadoDetallesProcesoScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/abogado-detalles-proceso-screen/AbogadoDetallesProcesosScreen';
import AbogadoNuevaAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-nueva-agenda-screen/AbogadoNuevaAgendaScreen';
import AbogadoEditarAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-editar-agenda-screen/AbogadoEditarAgendaScreen';
import AbogadoDetalleTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/AbogadoDetalleTareaScreen';
import CasesScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/CasesScreen';
import CaseDetailScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/CaseDetailScreen';
import { Tarea } from './src/types';
import AbogadoEditarTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/AbogadoEditarTareaScreen';
import UpdateProcessScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/UpdateProcessScreen';
import FacturasScreen from './src/presentation/views/abogado-screens/abogado-factura-screen/FacturasScreen';


export type RootStackParamList = {
  

  // Variables Publicas.
  InicioSesionScreen: undefined;

  // Variables Clientes.
  ClientePrincipalScreen:{
    numIdentificacion: string; // Parametro para la busqueda de citas
  }
  ClienteAgendaScreen: undefined;

  // Variables Abogado.
  AbogadoPrincipalScreen: {
    numIdentificacion: string; 
  };
    AbogadoAgendaScreen: {
      numIdentificacion2: string; // Parametro para la busqueda de citas
    }

  AbogadoNuevaAgendaScreen: undefined;
  AbogadoTareaScreen:{ 
    refresh?: boolean;
     newTaskId?: number; 
    };

  AbogadoNuevaTareaScreen: undefined;
  AbogadoProcesosScreen: undefined;
  AbogadoDetallesProcesoScreen: undefined;
  AbogadoDetalleTareaScreen: { 
    tarea: Tarea 
  };

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

  AbogadoEditarTareaScreen: { 
    tarea: Tarea 
  }; 

  CasesScreen: undefined;
  UpdateProcessScreen: { 
    caseId: string 
  };

  CaseDetailScreen: { 
    caseId: string;
    shouldRefresh?: boolean;
   };

   FacturasScreen: undefined;
   
   
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
          name="FacturasScreen"
          component={FacturasScreen}
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

        {/* Screen para los detaller de las tareas del abogado*/}
        <Stack.Screen
          name="AbogadoDetalleTareaScreen"
          component={AbogadoDetalleTareaScreen}
        />

        <Stack.Screen
          name="CasesScreen"
          component={CasesScreen}
        />

        <Stack.Screen
          name="CaseDetailScreen"
          component={CaseDetailScreen}
        />

        <Stack.Screen
          name="AbogadoEditarTareaScreen"
          component={AbogadoEditarTareaScreen}
        />
        <Stack.Screen
          name="UpdateProcessScreen"
          component={UpdateProcessScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
