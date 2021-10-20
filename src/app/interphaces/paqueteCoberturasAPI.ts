export interface  PaqueteCoberturasApi{
                               idPaquete:number,
                               idAseguradora:number,
                               CoberturasApi: CoberturasAPI[];
}
export interface CoberturasAPI {
    idCobertura:number,
    idTipoCobertura:number,
    idFactor:number                             
}