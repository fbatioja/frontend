import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../notifications.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { interval, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/usuario/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private notiService: NotificationsService,
    private userService: UsuarioService,
    private toastr: ToastrService,
    ) { }
  ngOnDestroy(){
    this.prueba.unsubscribe()
  }

    numNotificaciones: number = 0
    listNotificaciones: Array<any> =[]
    userId: number
    token: string
    prueba: Subscription;
    userInfo: Usuario;

  ngOnInit(
  ){
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
    this.listNotifications()
    this.prueba = interval(5000).subscribe(a => {
      this.listNotifications()
    })
    this.getUserInfo()
  }


  goTo(menu: string){
    const userId = this.userId
    const token = this.token
    if(menu === "logIn"){
      this.routerPath.navigate([`/`])
    }
    else if(menu === "album"){
      this.routerPath.navigate([`/albumes/${userId}/${token}`])
    }
    else{
      this.routerPath.navigate([`/canciones/-1/${userId}/${token}`])
    }
  }

  goToNotification(notificacion: any){
    if(notificacion.tipo_elemento.llave === "CANCION"){

      this.notiService.clearNotificaciones(this.userId, this.token, [notificacion.id]).subscribe()
      this.routerPath.navigate([`/canciones/${notificacion.idElemento}/${this.userId}/${this.token}`])
      this.listNotifications()
    }
  }

  listNotifications(): void{
    let ids:Array<Number> = []
    this.notiService.getNotificaciones(this.userId, this.token)
    .subscribe(resp => {
      this.listNotificaciones = resp.reverse()
      this.numNotificaciones = resp.length
      this.listNotificaciones.map( noti => {
        if(noti.emergido===false){
          ids.push(noti.id)
          this.toastr.info(`${noti.nombreElemento}-${noti.nombreUsuario}</br>${noti.mensaje.substring(0, 40)}`, "Nueva notificación", { enableHtml:true, closeButton: true, timeOut: 10000, progressBar: true })
        }
      })
      this.notiService.notificacionesEmergidas(this.userId, this.token, ids).subscribe()
    })
  }

  limpiarNotificaciones():void{
    let ids: Array<Number> = []
    this.listNotificaciones.map( n => {
      ids.push(n.id)
    })
    this.notiService.clearNotificaciones(this.userId, this.token, ids).subscribe()
    this.listNotifications()
  }

  showUserInfo():void {
    this.userService.openUserProfile(this.userId)
  }

  getUserInfo(): void {
    this.userService.getUserDetail(this.userId).subscribe(user => this.userInfo = user);
  }
}
