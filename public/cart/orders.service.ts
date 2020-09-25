import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderModel } from './order.model';
import { ClienteModel } from '../clientes/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  cliente: ClienteModel
  constructor (
    private fs: AngularFirestore
  ) {
    this.cliente = JSON.parse( localStorage.getItem( 'gdev-cliente' ) );
   }

  get userOrderRef() {
    return this.fs.collection(`clientes/${this.cliente.idCliente}/orders`).ref
  }
  
  async saveOrder( order: OrderModel ) {
    order.pay_date = new Date()
    order.state = 'pendiente'
    try {
      console.log(order);
      this.userOrderRef.add( { ...order } )
      localStorage.removeItem( 'gdev-order' )
      localStorage.removeItem( 'gdev-cart' )
      return 
    } catch (error) {
      console.error(error);
    }
  }

  async getUsersOrder() {
    const docs = await this.userOrderRef.orderBy('order_date', 'desc').get()
    var userOrders: OrderModel[] = []
    if ( docs.size > 0 ) {
      docs.forEach(doc => userOrders.push(doc.data() as OrderModel))
    }
    return userOrders
  }
}
