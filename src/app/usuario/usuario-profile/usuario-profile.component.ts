import {Component, Input, OnInit} from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {ToastrService} from "ngx-toastr";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Usuario} from "../usuario";

@Component({
  selector: 'app-usuario-profile',
  templateUrl: './usuario-profile.component.html',
  styleUrls: ['./usuario-profile.component.css']
})
export class UsuarioProfileComponent implements OnInit {
  @Input() userId: number;
  usuario: Usuario;
  initials: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  setUser(userID: number) {
    this.userId = userID;
    this.getUserDetail();
  }

  getUserDetail() {
    this.usuarioService.getUserDetail(this.userId).subscribe(
      usuario => {
        this.usuario = usuario;
        this.setInitials();
      },
        error => {
        this.toastr.error("Ha ocurrido un error. " + error.message, "Error");
        this.activeModal.close('Close click');
      }
    );
  }

  close(message: string) {
    this.activeModal.close(message);
  }

  private setInitials() {
    var names = this.usuario.nombre.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[1].substring(0, 1).toUpperCase();
    }
    this.initials = initials;
  }
}
