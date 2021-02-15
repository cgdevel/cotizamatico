import { CatalogoModel } from '../models/Catalogos.model';

export interface ResponseCatalogo {
  catalogos: CatalogoModel[];
  bSuccess: boolean;
  sMensaje: string;
}
