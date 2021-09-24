import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../comentario';
import { ComentariosService } from '../comentarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {UsuarioService} from "../../usuario/usuario.service";
import { ModalService } from '../confirmation-modal/modal.service';
import { ComentarioCreateComponent } from '../comentario-create/comentario-create.component';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.css']
})
export class RespuestaComponent implements OnInit {

  @Input() public id_parent?: number | null;
  @Input() public id_element?: number | null;
  @Input() public counter?: number;
  @Input() public userId: number;
  @Input() public tipo_elemento: string;

  comentarios : Array<Comentario>;
  respuestaForm : FormGroup;
  editing: Array<boolean>
  comentarioEdit: FormGroup;

  constructor(
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private confirmationModal: ModalService,
    private usuarioService: UsuarioService,
    private comentarioCreate: ComentarioCreateComponent
  ) { }

  ngOnInit() {
    this.respuestaForm = this.formBuilder.group({
      comentarios: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    })
    this.comentarioEdit = this.formBuilder.group({
      comentarios: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    })
    this.getRespuestasComentario();
    this.userId = parseInt(this.router.snapshot.params.userId);
  }

  ngOnChanges(){
    this.getRespuestasComentario();
  }

  getRespuestasComentario(){
    if(this.id_element){
      this.comentariosService.getComentariosElemento(this.id_element)
      .subscribe(c => {
        this.editing = []
        c.map(a => this.editing.push(false))
        this.comentarios = c});
    }
    else if (this.id_parent)
    {
      this.comentariosService.getRespuestasComentario(this.id_parent)
      .subscribe(c => {
        this.editing = []
        c.map(a => this.editing.push(false))
        this.comentarios = c});
    }
  }

  showRespuestas(comentario : Comentario){
    if(comentario.respuestas != undefined && comentario.respuestas.length > 0)
      comentario.verRespuestas = !comentario.verRespuestas;
  }

  showFormRespuesta(comentario : Comentario){
    comentario.verFormRespuesta = !comentario.verFormRespuesta;
    this.respuestaForm?.reset();
  }

  createRespuesta(comentario: Comentario, id_parent: number){
    if(comentario.comentarios.trim().length > 0){
      comentario.id_elemento = null;
      comentario.id_parent = id_parent;
      comentario.id_usuario =  this.userId;
      comentario.tipo_elemento = this.tipo_elemento;
      this.respuestaForm.get('comentarios')?.setValue(this.respuestaForm.get('comentarios')?.value)
      this.comentariosService.crearComentario(comentario)
      .subscribe(comentario => {
        this.respuestaForm.reset();
        this.respuestaForm?.reset();
        this.getRespuestasComentario();
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

  calculateDays(fecha: Date){
    return this.comentariosService.calculateDays(fecha);
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
      if(confirmed === true){
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

  editComentario(comentarioId: number, index:number){
    this.comentarioCreate.editComentario(comentarioId, index, this.editing, this.comentarioEdit, this.comentarios)
  }

  cancelEdit(index:number){
    this.comentarioCreate.cancelEdit(index, this.editing, this.comentarioEdit)
  }

  sendEdit(comentario: Comentario,comentarioId:number, index: number){
    this.comentarioCreate.sendEdit(comentario, comentarioId, index, this.editing, this.comentarioEdit, this.comentarios)
  }

}
