import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioProfileComponent } from './usuario-profile/usuario-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [UsuarioLoginComponent, UsuarioSignupComponent, UsuarioProfileComponent],
  imports: [
    CommonModule, ReactiveFormsModule, NgbModule
  ],
  exports: [UsuarioLoginComponent, UsuarioSignupComponent]
})
export class UsuarioModule { }
