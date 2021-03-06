import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {UsuarioProfileComponent} from "./usuario-profile/usuario-profile.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Usuario} from "./usuario";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {

    private backUrl: string = environment.baseUrl;

    constructor(
      private http: HttpClient,
      private modalService: NgbModal
    ) { }

    userLogIn(nombre: string, contrasena: string):Observable<any>{
        return this.http.post<any>(`${this.backUrl}/logIn`, {"nombre": nombre, "contrasena": contrasena });
    }

    userSignUp(nombre: string, contrasena: string): Observable<any>{
        return this.http.post<any>(`${this.backUrl}/signin`, {"nombre": nombre, "contrasena": contrasena})
    }

    getUsers(): Observable<any>{
        return this.http.get<any>(`${this.backUrl}/usuarios`)
    }

    getUserDetail(userId: number):  Observable<any>{
      return this.http.get<any>(`${this.backUrl}/usuario/${userId}`); /*/detalle`)*/
    }

    openUserProfile(userId: number): void {
      const modalRef = this.modalService.open(UsuarioProfileComponent, {size: 'sm'});
      modalRef.componentInstance.setUser(userId);
    }
}
