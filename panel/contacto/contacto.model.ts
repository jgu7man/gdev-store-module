export class DatosContactoModel {
    constructor (
        public store_name: string,
        public phone?: string,
        public whatsapp?: string,
        public email?: string,
        public facebook?: string,
        public instagram?: string,
        public youtube?: string
    ) {
        
    }
}