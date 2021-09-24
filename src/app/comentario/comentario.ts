import { Usuario } from "../usuario/usuario";

export class Comentario {
  id: number;
  comentarios: string;
  fecha: Date;
  id_elemento?: number | null;
  tipo_elemento: any;
  id_usuario: number;
  usuario: Usuario;
  id_parent?: number | null;
  respuestas?: Array<any>;
  verRespuestas : boolean;
  verFormRespuesta: boolean;
  calificaciones:  any[];
  constructor(
    id: number,
    comentarios: string,
    id_elemento: number,
    tipo_elemento: any,
    id_usuario: number,
    usuario: Usuario,
    id_parent?: number,
    respuestas?: Array<any>
  ){
      this.id = id;
      this.comentarios = comentarios;
      this.id_elemento = id_elemento;
      this.tipo_elemento = tipo_elemento;
      this.id_usuario = id_usuario;
      this.usuario = usuario;
      this.id_parent = id_parent;
      this.respuestas = respuestas;
      this.verRespuestas = false;
      this.verFormRespuesta = false;
  }
}
