import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calificacion } from './calificacion';
import { CalificacionService } from './calificacion.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {
  @Input() public id_comentario: number;
  @Input() public id_usuario_comentario: number;
  @Input() public calificaciones: any[];
  private userId:number;
  estrellas:number=0;
  calificacion: Calificacion;
  promedioCalificacion: number = 0;
  readonly:boolean = false;

  constructor(
    private router: ActivatedRoute,
    private calificacionService: CalificacionService,
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId);
    this.calculateProm();
    this.calificacionComentarioUsuario();
    this.readonly = this.userId == this.id_usuario_comentario ? true : false;
  }

  createCalificacion(){
    this.calificacion = new Calificacion(this.estrellas,this.id_comentario,this.userId);
    this.calificacionService.crearCalificacion(this.calificacion)
    .subscribe(comentario => {
      this.getListaCalificacionesComentario();
    });
  }

  getListaCalificacionesComentario(){
    this.calificacionService.getCalificacionesComentario(this.id_comentario)
    .subscribe(c => {
      this.calificaciones = c;
      this.calculateProm()
    })
  }

  calculateProm(){
    if(this.calificaciones != undefined){
      if(this.calificaciones.length > 0){
        let suma:number = 0;
        for(let i=0; i< this.calificaciones.length; i++){
          suma = suma + this.calificaciones[i].calificacion;
        }
        this.promedioCalificacion = (suma/this.calificaciones.length);
      }
    }
  }

  calificacionComentarioUsuario(){
    if(this.calificaciones != undefined){
      if(this.calificaciones.length > 0){
        var miCalificacion = this.calificaciones.filter(x => x.usuario == this.userId && x.comentario == this.id_comentario);
        if(miCalificacion != undefined)
          this.estrellas = miCalificacion[0].calificacion;
      }
    }
  }

}
