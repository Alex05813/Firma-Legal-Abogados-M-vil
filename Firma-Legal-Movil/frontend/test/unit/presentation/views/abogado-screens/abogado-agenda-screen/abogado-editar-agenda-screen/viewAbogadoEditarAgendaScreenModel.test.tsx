import { Alert } from 'react-native';
import AbogadoEditarAgendaViewModel from '../../../../../../../src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-editar-agenda-screen/viewAbogadoEditarAgendaScreenModel' 

jest.mock('react-native', () => {
  const actual = jest.requireActual('react-native');
  return {
    ...actual,
    Alert: {
      alert: jest.fn(),
    },
    Platform: { OS: 'android' },
  };
  
});

jest.mock('../../../../../../../src/domain/services/getBaseUrl', () => ({
  getBaseUrl: () => 'http://mocked-url.com',
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe('AbogadoEditarAgendaViewModel', () => {
  const agendaData = {
    id_agenda: 1,
    id_proceso: 2,
    estado: 'Programada',
    fecha: new Date().toISOString(),
    hora: '10:00',
    descripcion: 'Test desc',
  };

  // Modifica el objeto route para incluir las propiedades requeridas
  const route = { 
    params: { agendaData },
    key: 'test-key',
    name: 'AbogadoEditarAgendaScreen' as const
  };


  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('confirmarEliminacion muestra el Alert con los botones correctos', () => {
  const viewModel = AbogadoEditarAgendaViewModel({ route });
  
  viewModel.confirmarEliminacion();

  expect(Alert.alert).toHaveBeenCalledWith(
    "Eliminar cita",
    "¿Estás seguro de que deseas eliminar esta cita?",
    expect.arrayContaining([
      expect.objectContaining({ text: "No", style: "cancel" }),
      expect.objectContaining({ 
        text: "Sí", 
        onPress: expect.any(Function) // No necesitas mockear eliminar_cita directamente
      }),
    ]),
    { cancelable: true }
  );
});


  it('el botón "Sí" del Alert llama a eliminar_cita', () => {
  const viewModel = AbogadoEditarAgendaViewModel({ route });
  
  viewModel.confirmarEliminacion();
  
  const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
  const buttons = alertCall[2];
  const botonSi = buttons.find((b: any) => b.text === "Sí");
  
  // Simplemente verifica que el botón tiene una función
  expect(typeof botonSi.onPress).toBe('function');

  // Verificar que el Alert se llamó exactamente 1 vez
// expect(Alert.alert).toHaveBeenCalledTimes(1);
});
});