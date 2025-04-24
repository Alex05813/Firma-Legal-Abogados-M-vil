
// ________INTERFACES EXPLCITICITAS__________
/*
- En componentes: 
    import { Agenda } from '../../../domain/models';

- En servicios API:
    import { Agenda, AgendasResponse } from '../../domain/models';

- En navegacion:
    import { RootStackParamList } from '../../domain/models';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}*/

// Modelo principal de Agenda
export interface Agenda {
    _id: string;
    id_agenda: number;
    fecha: string | Date;
    hora: string;
    descripcion: string;
    estado: string;
    procesoDescripcion?: string;
    numeroIdentificacionCliente?: string;
    numeroIdentificacionAbogado?: string;
    id_proceso?: number; // El ? la hace opcional
    createdAt?: string;
    updatedAt?: string;
  }

  // Tipos para las respuestas API
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }

  export type AgendasResponse = ApiResponse<{
    agendasConProceso: Agenda[];
  }>;
  