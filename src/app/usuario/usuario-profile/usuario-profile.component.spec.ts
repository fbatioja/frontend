import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioProfileComponent } from './usuario-profile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('UsuarioProfileComponent', () => {
  let component: UsuarioProfileComponent;
  let fixture: ComponentFixture<UsuarioProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioProfileComponent, ],
      imports: [NgbModule, HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [NgbActiveModal, NgbModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
