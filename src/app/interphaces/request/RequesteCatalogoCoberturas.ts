export interface RequestCatalogoCoberturas{
    NombreCatalogo: "ValoresFactorCoberturaProducto",
    valoresCoberturas:
    {
       iIdAseguradoraSubRamo:number,      //IDaseguradora
       iIdProducto: number,                //tipo cobertura amplia->1, amplia plus->2,  limitada->3
       iIdCoberturaPorProducto:number, //idcobertura por producto
       iIdTipoValor:number             // deducible-> 2, suma asegurada-> 1
    }    
 }