import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AbogadoEditarAgendaViewModel } from '../../../../../../../src/presentation/views/abogado-screens/abogado-agenda-screen/abogado-editar-agenda-screen/viewAbogadoEditarAgendaScreenModel';
// import { getBaseUrl } from '../../../../../../../src/domain/services/getBaseUrl';

// Mock mínimo de react-native para evitar conflictos
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  Platform: {
    OS: 'ios',
  },
  NativeModules: {
    DevMenu: {
      show: jest.fn(),
    },
  },
}));

// Mock de react-navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      agendaData: {
        id_agenda: 1,
        id_proceso: 1,
        estado: 'Programada',
        fecha: '2023-01-01',
        hora: '10:00',
        descripcion: 'Descripción de prueba',
      }
    }
  }),
}));

// Mock de axios
jest.mock('axios', () => ({
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

// Mock de otros módulos problemáticos
jest.mock('@react-native-community/datetimepicker', () => ({}));
jest.mock('../../../../../../../src/domain/services/getBaseUrl', () => ({
  getBaseUrl: jest.fn(() => 'http://localhost:3000'),
}));

describe('AbogadoEditarAgendaViewModel', () => {
  const mockRoute = {
    key: 'AbogadoEditarAgendaScreen-123',
    name: 'AbogadoEditarAgendaScreen' as const,
    params: {
      agendaData: {
        id_agenda: 1,
        id_proceso: 1,
        estado: 'Programada',
        fecha: '2023-01-01',
        hora: '10:00',
        descripcion: 'Descripción de prueba',
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Alert.alert with correct params when confirmarEliminacion is called', () => {
    const { result } = renderHook(() => 
      AbogadoEditarAgendaViewModel({ route: mockRoute })
    );

    result.current.confirmarEliminacion();

    const { alert } = require('react-native').Alert;
    expect(alert).toHaveBeenCalledWith(
      "Eliminar cita",
      "¿Estás seguro de que deseas eliminar esta cita?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: expect.any(Function),
        },
      ],
      { cancelable: true }
    );
  });

  it('should call eliminar_cita when user confirms deletion', async () => {
    const { result } = renderHook(() => 
      AbogadoEditarAgendaViewModel({ route: mockRoute })
    );

    result.current.confirmarEliminacion();

    const { alert } = require('react-native').Alert;
    const alertCalls = (alert as jest.Mock).mock.calls;
    const onPressYes = alertCalls[0][2][1].onPress;
    await onPressYes();

    const axios = require('axios');
    expect(axios.delete).toHaveBeenCalled();
  });
});