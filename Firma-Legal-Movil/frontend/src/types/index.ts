export interface Tarea {
    id_tarea: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    estado: string;
    hora_inicio?: string;
    hora_fin?: string;
    todo_el_dia?: boolean;
    vincular_expediente?: boolean;
    asociar_directorios?: boolean;
    asignado_a?: string;
    creado_por?: string;
  }

  