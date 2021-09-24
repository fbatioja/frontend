import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Calificacion } from './calificacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private backUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  crearCalificacion(calificacion: Calificacion):Observable<Calificacion>{
    return this.http.post<Calificacion>(`${this.backUrl}/calificacion`, calificacion)
  }

  getCalificacionesComentario(idComentario?: number): Observable<Calificacion[]>{
    return this.http.get<Calificacion[]>(`${this.backUrl}/calificacionescomentario/${idComentario}`)
  }


}
