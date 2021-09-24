import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../usuario/usuario.service';
import { Usuario } from '../../usuario/usuario';
import { Cancion } from '../cancion';
import { CancionService } from '../cancion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancion-detail',
  templateUrl: './cancion-detail.component.html',
  styleUrls: ['./cancion-detail.component.css'],
})
export class CancionDetailComponent implements OnInit {
  @Input() cancion: Cancion;
  @Output() deleteCancion = new EventEmitter();

  userId: number;
  token: string;
  selectedUsers: Array<number> = [];
  displayedUsers: string = '';
  usuarios: Array<Usuario>;
  usuariosList: Array<Usuario>;
  propietario: string;
  emptyUsers: boolean = true;
  existingShareUsers: Array<number> = [];

  constructor(
    private router: ActivatedRoute,
    private routerPath: Router,
    private cancionService: CancionService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId);
    this.token = this.router.snapshot.params.userToken;
  }

  ngOnChanges(): void {
    if (this.cancion !== undefined) {
      this.existingShareUsers = this.cancion.usuarios;
      this.getUsuarios();
    }
  }

  getUsuarios() {
    let otrosUsuarios: Array<Usuario> = [];
    this.usuarioService.getUsers().subscribe((usuarios) => {
      usuarios.map((c: Usuario) => {
        if (c.id !== this.userId && !this.existingShareUsers.includes(c.id)) {
          otrosUsuarios.push(c);
        }
        if (this.cancion.usuario == c.id) {
          this.propietario = c.nombre;
        }
      });
    });
    this.usuariosList = this.usuarios = otrosUsuarios;
  }

  eliminarCancion() {
    this.deleteCancion.emit(this.cancion.id);
  }

  goToEdit() {
    this.routerPath.navigate([
      `/canciones/edit/${this.cancion.id}/${this.userId}/${this.token}`,
    ]);
  }

  onSelect(userId: any) {
    let numUserId = Number(userId);
    if (!this.selectedUsers.includes(numUserId)) {
      let displayName = this.usuarios.find((u) => u.id === numUserId)!;
      let index = this.usuarios.indexOf(displayName);
      this.displayedUsers +=
        this.selectedUsers.length > 0
          ? `, ${displayName.nombre}`
          : `${displayName.nombre}`;
      this.selectedUsers.push(numUserId);
      this.usuariosList.splice(index, 1);
      this.emptyUsers = false;
    }
  }

  onFilter(userName: string) {
    this.usuariosList = this.usuarios.filter(
      (u) => u.nombre.includes(userName) && !this.selectedUsers.includes(u.id)
    );
  }

  clean() {
    this.selectedUsers = [];
    this.displayedUsers = '';
    this.emptyUsers = false;
  }

  share() {
    if (this.selectedUsers.length > 0) {
      this.emptyUsers = false;
      this.cancionService
        .compartirCancion(this.cancion.id, this.selectedUsers)
        .subscribe(
          (usuarios) => {
            usuarios.map((c: Usuario) => {
              this.selectedUsers.forEach((item) => {
                this.cancion.usuarios.push(item);
              });
              this.showSuccess();
              this.clean();
            });
          },
          (err) => this.showError(err.error)
        );
    } else {
      this.emptyUsers = true;
    }
  }

  showError(error: string) {
    this.toastr.error(error, 'Error de compartido');
  }

  showSuccess() {
    this.toastr.success(`La canción fue compartida`, 'Compartido exitoso');
  }
}
