import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {NotificationsService} from "../app-header/notifications.service";
import {UsuarioService} from "../usuario/usuario.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userId: number;
  token: string;
  @Input() componentActive = 'albumes';

  constructor(
    private routerPath: Router,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notiService: NotificationsService,
    private userService: UsuarioService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(){
    this.userId = parseInt(this.activatedRoute.snapshot.params.userId);
    this.token = this.activatedRoute.snapshot.params.userToken;
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

}
