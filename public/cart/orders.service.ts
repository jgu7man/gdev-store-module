import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderModel } from './order.model';
import { ClienteModel } from '../clientes/cliente.model';
import { DatosContactoModel } from '../../../gdev-panel/contacto/contacto.model';
import { GdevMainService } from '../../../gdev-panel/gdev-main.service';
import { MailService } from '../../../gdev-panel/mails/mail.service';
import { ContactoComponent } from '../../../gdev-panel/contacto/contacto.component';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  cliente: ClienteModel
  store: DatosContactoModel

  constructor (
    private fs: AngularFirestore,
    private _mails: MailService,
    private _main: GdevMainService
  ) {
    this.cliente = JSON.parse( localStorage.getItem( 'gdev-cliente' ) );
    
  }
  
  

  get userOrderRef() {
    return this.fs.collection(`clientes/${this.cliente.idCliente}/orders`).ref
  }
  
  async saveOrder( order: OrderModel ) {
    this.store = await this._main.getContactDatos()
    order.pay_date = new Date()
    order.state = 'pendiente'
    try {
      console.log(order);
      this.userOrderRef.add( { ...order } )
        .then( order => this.userOrderRef.doc( order.id ).update( { orderId: order.id } ) );
      
      this._mails.sendAdminMail( 'newOrder' )
      this._mails.sendClientMail( order.buyer.email, 'successOrder' )
      
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

  async getByState(state: string) {
    const docs = await this.userOrderRef.orderBy( 'order_date', 'desc' )
      .where('state', '==', state)
      .get()
    var userOrders: OrderModel[] = []
    if ( docs.size > 0 ) {
      docs.forEach( doc => {
        let order = doc.data() as OrderModel
        order.pay_date = doc.data().pay_date.toDate()
        if ( order.delivery.delivery_date ) {
          order.delivery.delivery_date = doc.data().delivery.delivery_date.toDate()
        }
        if ( order.ship_method == 'pickup' ) {
          order.pickup.pickup_date = doc.data().pickup.pickup_date.toDate()
        }
        userOrders.push( order )
      } )
    }
    return userOrders
  }
}
