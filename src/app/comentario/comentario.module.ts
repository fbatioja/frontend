import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentarioCreateComponent } from './comentario-create/comentario-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestaComponent } from './respuesta/respuesta.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, NgbModule
  ],
  declarations: [ComentarioCreateComponent,RespuestaComponent,CalificacionComponent],
  exports:[ComentarioCreateComponent, RespuestaComponent,CalificacionComponent]
})
export class ComentarioModule { }
