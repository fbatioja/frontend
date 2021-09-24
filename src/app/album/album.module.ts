import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AppFooterModule } from '../app-footer/app-footer.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';
import { AlbumJoinCancionComponent } from './album-join-cancion/album-join-cancion.component';
import {CancionModule} from "../cancion/cancion.module";


@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, AlbumEditComponent, AlbumJoinCancionComponent],
    imports: [
        CommonModule, ReactiveFormsModule, AppHeaderModule, AppFooterModule, CancionModule
    ],
  exports:[AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, AlbumEditComponent, AlbumJoinCancionComponent]
})
export class AlbumModule { }
