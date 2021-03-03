export default interface AseguradoraJson {
    nombre: string ;
    primerPago : number;
    pagos: number;
    total: number;
    logo:  string;
    coberturas : Cobertura[]
}

export interface Cobertura {
    nombre: string;
    cobertura: boolean; 
}