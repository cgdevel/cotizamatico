export interface ResponseCatalogoCoberturas{
    catalogoJsonString: CatalogoJsonString[];
}

export interface CatalogoJsonString{
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
 
