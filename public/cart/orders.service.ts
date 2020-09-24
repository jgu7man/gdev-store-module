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
    try {
      this.userOrderRef.add( { ...order } )
      return 
    } catch (error) {
      console.error(error);
    }
  }
}
