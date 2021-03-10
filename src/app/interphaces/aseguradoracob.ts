export default interface AseguradoraCobJson {
    nombre: string ;
    primerPago: number;
    pagos: number;
    total: number;
    logo: string;
    coberturas: Cobertura[];
    coberturasAdicionales: CoberturaAdic[];
}

export interface Cobertura {
    nombre: string;
    maximo: number;
    minimo: number;
    init: number;
}
export interface CoberturaAdic {
    nombre: string;
    default: boolean;
    obligatorio: boolean;
}