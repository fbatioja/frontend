import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../comentario';
import { ComentariosService } from '../comentarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../confirmation-modal/modal.service';
import {UsuarioService} from "../../usuario/usuario.service";

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario-create.component.html',
  styleUrls: ['./comentario-create.component.css']
})
export class ComentarioCreateComponent implements OnInit {

  @Input() public id_elemento?: number | null;
  @Input() public tipo_elemento: string;
  comentarios : Array<Comentario>;
  comentarioInitialForm: FormGroup;
  userId: number;
  editing: Array<boolean>
  comentarioEdit: FormGroup;
  counter: number;

  constructor(
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private confirmationModal: ModalService
    ) { }

  ngOnInit() {
    this.counter = 0;
    this.comentarioInitialForm = this.formBuilder.group({
      comentarios: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    })
  }

  ngOnChanges(){
    this.counter = 0;
    this.userId = parseInt(this.router.snapshot.params.userId);
    this.comentarioInitialForm?.reset();
  }

  createCommentBase(comentario: Comentario){
    if(comentario.comentarios.trim().length > 0){
      comentario.id_elemento = this.id_elemento?this.id_elemento:0;
      comentario.id_parent = null;
      comentario.id_usuario =  this.userId;
      comentario.tipo_elemento = this.tipo_elemento;
      this.comentarioInitialForm.get('comentariosBase')?.setValue(this.comentarioInitialForm.get('comentariosBase')?.value)
      this.comentariosService.crearComentario(comentario)
      .subscribe(comentario => {
        this.comentarioInitialForm.reset();
        this.id_elemento = comentario.id_elemento;
        this.counter = this.counter + 1;
      },
      error=> {
        if(error.statusText === "UNPROCESSABLE ENTITY"){
          this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        }
        else{
          this.showError("Ha ocurrido un error. " + error.message)
        }
      })
    }
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string){
    this.toastr.warning(warning, "Error de autenticación")
  }

  showUserProfile(id: number) {
    this.usuarioService.openUserProfile(id);
  }

  deleteComentario(comentarioId: number, index: number){
    this.confirmationModal.confirm("Eliminar comentario", "¿Está seguro que desea eliminar el comentario?")
    .then((confirmed) => {

      if(confirmed ===true){
        this.comentariosService.deleteComentario(comentarioId, this.userId)
        .subscribe( resp =>{
          this.toastr.success(resp, "Acción exitosa")
          this.comentarios.splice(index, 1)
        },
        error => {
          this.toastr.error(error.error, "Error")
        })
      }
    })
  }

  editComentario(comentarioId: number, index:number, listEditing: Array<boolean>, formEdit: FormGroup, listComentarios: Array<Comentario>){
    listEditing[index] = !listEditing[index]
    formEdit.get('comentarios')?.setValue(listComentarios[index].comentarios)
  }

  cancelEdit(index:number, listEditing: Array<boolean>, formEdit: FormGroup){
    listEditing[index] = !listEditing[index]
    formEdit.reset()
  }

  public sendEdit(comentario: Comentario,comentarioId:number, index: number, listEditing: Array<boolean>, formEdit: FormGroup, listComentarios: Array<Comentario>){
    if(listEditing[index]){
      this.comentariosService.editComentario(comentarioId, this.userId, comentario.comentarios)
      .subscribe( comentarioResp => {
        listEditing[index] = !listEditing[index]
        listComentarios[index].comentarios = comentarioResp.comentarios
        this.toastr.success("El comentario se editó exitosamente", "Acción exitosa")
      },
      error => this.toastr.error(error.error, "Error"))
    }
    formEdit.reset()
  }

}
