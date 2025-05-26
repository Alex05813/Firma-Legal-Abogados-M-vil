import { renderHook, act } from '@testing-library/react-hooks';
import viewInicioSesionScreenModel from '../../../../../src/presentation/views/inicio-screen/viewInicioSesionScreenModel';

// Mocks globales
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));
jest.mock('axios');
jest.mock('jwt-decode');

describe('viewInicioSesionScreenModel', () => {
  it('limpiar_formulario debe limpiar los campos de email y password', () => {
    const { result } = renderHook(() => viewInicioSesionScreenModel());

    act(() => {
      result.current.setEmail('test@correo.com');
      result.current.setPassword('123456');
    });

    expect(result.current.email).toBe('test@correo.com');
    expect(result.current.password).toBe('123456');

    act(() => {
      result.current.limpiar_formulario();
    });

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
  });
});