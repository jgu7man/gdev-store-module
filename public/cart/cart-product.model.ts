import { GdevStoreProductModel, ProdVariante, Addon } from '../../panel/products/product.model';

export interface CartProductModel {
    productId?: string,
    unit_precio?: number
    cant?: number,
    variante?: {
        name?: string,
        option?: Addon
    },
    adiciones?: Addon[]
    description?: GdevStoreProductModel,
}

