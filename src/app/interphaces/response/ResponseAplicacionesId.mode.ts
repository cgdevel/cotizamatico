export interface ResponseAplicacionesId {
  aplicacionesId: AplicacionesId[];
  Success: boolean;
  Message: string;
  Token: string;
}

export interface AplicacionesId {
  iIdAplicacion: number;
  sAplicacion: string;
}
