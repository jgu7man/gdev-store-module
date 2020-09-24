export class OrderModel {
    constructor (
        public products: ProductOrdered[],
        public totales: OrderTotales,
        public order_date: Date,
        public ship_method?: 'pickup' | 'delivey',
        public buyer?: Buyer,
        public delivery?: DeliveryAddress,
        public pickup?: PickupOrder,
        public pay_date?: Date,
        public orderId?:string,
    ){}
}

export interface Buyer {
    name: string,
    email: string,
    celular: string,
}

export interface DeliveryAddress {
    address: string,
    depto: string,
    city: string,
    state: string,
    country: string,
    delivery_date: Date
    orderId?: string
}

export interface PickupOrder {
    branch: string,
    pickup_date: Date,
    orderId?:string
    otherName?: string,
    otherId?:string
}

export interface ProductOrdered {
    id: string,
    reference: string,
    cant: number,
    unit_price: number,
    cant_price: number
}

export interface OrderTotales {
    grand_total: number,
    tax?: number,
    subtotal?: number,
}

