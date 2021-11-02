import Anuncio from "./anuncio-base.js";

///MODIFICAR DE ACUERDO AL TIPO DE ANUNCIO QUE SE PIDA
export class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia){
        super(id, titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }
}