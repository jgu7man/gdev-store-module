export class GdevStoreCategoryModel {
    constructor (
        public name: string,
        public fields: string[],
        public path?: string,
        public image?: string,
        public desription?: string
    ) {
        
    }
}