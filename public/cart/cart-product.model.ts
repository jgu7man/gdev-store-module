import { GdevStoreProductModel } from '../../panel/products/product.model';
export interface CartProductModel {
    productId: string,
    cant: number,
    varieties?: string[],
    description?: GdevStoreProductModel
}