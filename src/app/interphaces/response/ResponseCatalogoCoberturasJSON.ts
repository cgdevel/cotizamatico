export interface ResponseCatalogoCoberturasJSON{
    catalogoJsonString: Array <CatalogoJsonStringJSON>;
}

export interface CatalogoJsonStringJSON{
    nIdAseguradoraSubRamo:              number,
    sAseguradora:                       string,
    nIdCoberturaPorProducto:            number,
    sCobertura:                         string,
    nIdProducto:                        number,
    sProducto:                          string,
    nIdCatalogoValor:                   number,
    sValorCatalogoValor:                string,
    nIdTipoValor:                       number,
    sTipoValor:                         string,
    bSiNoAdicionales:                   boolean,
    bSiNoDefault:                       boolean
}
 