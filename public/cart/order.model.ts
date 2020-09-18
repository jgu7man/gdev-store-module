export interface OrderModel {
    orderId:string
    products: ProductOrdered[],
    totales: OrderTotales,
    order_date: Date,
    ship_method: 'pickup' | 'delivey'
    buyer?: Buyer,
    delivery?: DeliveryAddress,
    pickup?: PickupOrder
    pay_date?: Date
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

