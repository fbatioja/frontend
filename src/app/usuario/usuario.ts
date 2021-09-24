export class Usuario {
    id: number;
    nombre: string
    albumes: Array<any>
    totalAlbumes: number
    totalCanciones: number
    totalComentarios: number
    calificacion: number

    constructor(
        id: number,
        nombre: string,
        albumes: Array<any>,
        totalAlbumes: number,
        totalCanciones: number,
        totalComentarios: number,
        calificacion: number
    ){
        this.id = id;
        this.nombre = nombre;
        this.albumes = albumes
        this.totalAlbumes = totalAlbumes,
        this.totalCanciones = totalCanciones,
        this.totalComentarios = totalComentarios,
        this.calificacion = calificacion
    }
}
