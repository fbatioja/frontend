import { Usuario } from "../../usuario/usuario";
import { Comentario } from "../comentario";

export class Calificacion {
  id?: number | null;
  calificacion: number;
  id_comentario: number;
  id_usuario: number;
  usuario?: Usuario;
  comentario?: Comentario;

  constructor(
    calificacion: number,
    id_comentario: number,
    id_usuario: number,
    usuario?: Usuario,
    comentario?: Comentario,
    id?: number
  ){
      this.id = id;
      this.calificacion = calificacion;
      this.id_comentario = id_comentario;
      this.id_usuario = id_usuario;
      this.usuario = usuario;
      this.comentario = comentario;
  }
}
