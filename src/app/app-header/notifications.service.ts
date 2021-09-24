import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private backUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getNumNotificaciones(usuario: number, token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(`${this.backUrl}/numeroNotificaciones/${usuario}`, {headers: headers})
  }

  getNotificaciones(usuario:number, token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Array<any>>(`${this.backUrl}/notificacion/${usuario}`, {headers: headers})
  }

  clearNotificaciones(usuario: Number, token: string, vistos: Array<Number>): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put(`${this.backUrl}/notificacion/${usuario}`, {vistos:vistos}, {headers: headers})
  }

  notificacionesEmergidas(usuario: Number, token: string, vistos: Array<Number>): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(`${this.backUrl}/notificacion/${usuario}`, {vistos:vistos}, {headers: headers})
  }

}
