export class ClienteModel {
    constructor (
        public nombre: string,
        public celular: string,
        public contra?: string,
        public email?: string,
        public direcciones?: ClienteDomicilio[],
        public registrado?: Date,
        public idCliente?: string,
    ) { }
}

export interface ClienteDomicilio {
    direccion: string,
    numeral: string,
    colonia: string,
    ciudad: string,
    estado: string,
    pais: string,
    codigo_postal: string
}