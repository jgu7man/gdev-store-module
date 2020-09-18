export class GdevStoreProductModel {
    constructor (
        public id: string,
        public referencia: string,
        public precio: number,
        public onStock: boolean,
        public stockCant: any,
        public imagenUrl: any,
        public descripcion: string,
        public galeria: any[],
        public categorias: string[]
    ) { }
}