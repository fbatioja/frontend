import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancionListComponent } from './cancion-list/cancion-list.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AppFooterModule } from '../app-footer/app-footer.module';
import { CancionDetailComponent } from './cancion-detail/cancion-detail.component';
import { CancionCreateComponent } from './cancion-create/cancion-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CancionEditComponent } from './cancion-edit/cancion-edit.component';
import { ComentarioModule } from '../comentario/comentario.module';
import {MenuComponent} from "../menu/menu.component";



@NgModule({
    declarations: [CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent, MenuComponent],
  imports: [
    CommonModule, AppHeaderModule, AppFooterModule, ReactiveFormsModule, ComentarioModule
  ],
  exports: [CancionListComponent, CancionDetailComponent, CancionCreateComponent, CancionEditComponent, MenuComponent]
})
export class CancionModule { }
