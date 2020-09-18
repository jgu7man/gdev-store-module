import { GdevStoreProductModel } from '../../panel/products/product.model';
export class WishlistProduct {
    constructor (
        public productId: string,
        public agregado?: Date | string,
        public description?: GdevStoreProductModel
    ){}
}