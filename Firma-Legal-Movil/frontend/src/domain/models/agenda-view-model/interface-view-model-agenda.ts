export interface Agenda {
    _id: string;
    id_agenda: number;
    fecha: string;
    hora: string;
    descripcion: string;
    estado: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    numeroIdentificacionAbogado?: string;
    numeroIdentificacionCliente?: string;
    procesoDescripcion?: string;
  }