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
import AbogadoAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/AbogadoAgendaScreen';
import AbogadoFacturaScreen from './src/presentation/views/abogado-screens/abogado-factura-screen/AbogadoFacturaScreen';
import AbogadoNuevaAgendaScreen from './src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-nueva-agenda-screen/AbogadoNuevaAgendaScreen';
import AbogadoTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/AbogadoTareaScreen';
import AbogadoNuevaTareaScreen from './src/presentation/views/abogado-screens/abogado-tarea-screen/abogado-nueva-tarea-screen/AbogadoNuevaTareaScreen';
import CaseDetailScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/CaseDetailScreen';
import CasesScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/CasesScreen';
// import NewCaseScreen from './src/presentation/views/abogado-screens/abogado-procesos-screen/ProcessService';

export type RootStackParamList = {

  // Variables Publicas.
  InicioSesionScreen: undefined;

  // Variables Clientes.
  ClientePrincipalScreen: undefined;
  ClienteAgendaScreen: undefined;

  // Variables Abogado.
  AbogadoPrincipalScreen: undefined;
  AbogadoAgendaScreen: undefined;
  AbogadoFacturaScreen: undefined;
  AbogadoNuevaAgendaScreen: undefined;
  AbogadoTareaScreen: undefined;
  AbogadoNuevaTareaScreen: undefined;
  CaseDetailScreen: { caseId: string };
  CasesScreen: undefined;
  // NewCaseScreen: undefined;
};


const Stack = createNativeStackNavigator <RootStackParamList>

();


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
          name="AbogadoFacturaScreen"
          component={AbogadoFacturaScreen}
        />

        {/* Pagina para crear una nueva agenda del abogado*/}
        <Stack.Screen
          name="AbogadoNuevaAgendaScreen"
          component={AbogadoNuevaAgendaScreen}
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

        <Stack.Screen
          name="CaseDetailScreen"
          component={CaseDetailScreen}
        />

        <Stack.Screen
          name="CasesScreen"
          component={CasesScreen}
        />

        {/* <Stack.Screen
          name="NewCaseScreen"
          component={NewCaseScreen}
        /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
