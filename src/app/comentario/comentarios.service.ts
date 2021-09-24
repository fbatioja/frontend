import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from './comentario';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private backUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getComentariosElemento(idElemento?: number): Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.backUrl}/comentarioscancion/${idElemento}`)
  }

  crearComentario(comentario: Comentario):Observable<Comentario>{
    return this.http.post<Comentario>(`${this.backUrl}/comentarios`, comentario)
  }

  getRespuestasComentario(idComentario?: number): Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.backUrl}/respuestascomentario/${idComentario}`)
  }

  calculateDays(fecha: Date){
    let fechaComentario = new Date(fecha);
    let fechaActual = new Date();
    let diffInTime = fechaActual.getTime() - fechaComentario.getTime();
    if (diffInTime < 0) {
      diffInTime = diffInTime + 18800;
    }
    if(diffInTime/1000 < 60)
      return `${(diffInTime/1000).toFixed(0)} segundos`;
    if(diffInTime/1000/60 < 60)
      return `${(diffInTime/1000/60).toFixed(0)} minutos`;
    if(diffInTime/1000/60/60 < 24)
      return `${(diffInTime/1000/60/60).toFixed(1)} horas`;
    if(diffInTime/1000/60/60/24 < 60)
      return `${(diffInTime/1000/60/60/24).toFixed(1)} días`;
    return ``;
  }

  deleteComentario(idComentario: number, idUsuario:number){
    return this.http.delete<string>(`${this.backUrl}/comentario/${idComentario}/${idUsuario}`)
  }

  editComentario(idComentario:number, idUsuario: number, comentario:string){
    return this.http.put<Comentario>(`${this.backUrl}/comentario/${idComentario}/${idUsuario}`, {"comentario": comentario})
  }

}
