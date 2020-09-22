export class GdevStoreProductModel {
    constructor (
        public referencia: string,
        public precio: number,
        public onStock: boolean,
        public stockCant: any,
        public imagenUrl: any,
        public descripcion: string,
        public categorias: string[],
        public galeria?: any[],
        public variantes?: ProdVariante[],
        public addons?: Addon[],
        public desc?:ProdDesc,
        public id?: string,
    ) { }
}


export interface ProdVariante {
    name: string,
    variantes?: Addon[]
}

export interface Addon {
    ref: string,
    precio: number
}

export interface ProdDesc {
    cant: number,
    type: '%' | '$',
    exp: Date
}

