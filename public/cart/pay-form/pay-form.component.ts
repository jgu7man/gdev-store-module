import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DeliveryConfig } from 'src/app/gdev-store/panel/store-config/delivery-config/delivery-config.model';
import { ClienteModel } from '../../clientes/cliente.model';
import { DeliveryAddress, ProductOrdered, OrderModel, Buyer, OrderTotales } from '../order.model';
import { DeliveryService } from '../../../panel/store-config/delivery-config/delivery.service';
import { OrdersService } from '../orders.service';
import { AlertService } from '../../../../Gdev-Tools/alerts/alert.service';
import { PreguntaAlertaModel, MessageAlertModel } from '../../../../Gdev-Tools/alerts/alerts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent implements OnInit {

  payForm = new FormControl( '', [ Validators.required ] );
  cliente: ClienteModel
  buyer: Buyer
  delivery: DeliveryAddress
  order: OrderModel
  totales: OrderTotales
  @Input() total_pagar: number = 0
  deliveryConfig: DeliveryConfig
  
  deliveryInvalidForm: boolean
  pickupValidForm: boolean
  
  constructor (
    private _deliveryS: DeliveryService,
    private _orders: OrdersService,
    private _alert: AlertService,
    private router: Router
  ) {
    this.order = new OrderModel([], this.totales,'',false)
    this.order = JSON.parse( localStorage.getItem( 'gdev-order' ) )
    this.delivery = {
      address: '',
      depto: '',
      city: '',
      state: '',
      country: 'México',
    }
    this.buyer = { name: '', email: '', celular: '',id:'' }
    this.totales = { grand_total: 0, tax: 0, subtotal: 0,}
   }

  async ngOnInit() {
    this.setBuyer()
    this.setCostos()
  }
  
  async setBuyer() {
    this.cliente = JSON.parse( localStorage.getItem( 'gdev-cliente' ) )
    this.buyer.name = this.cliente.nombre ? this.cliente.nombre : '';
    this.buyer.celular = this.cliente.celular ? this.cliente.celular : '';
    this.buyer.email = this.cliente.email ? this.cliente.email : '';
    this.buyer.id = this.cliente.idCliente ? this.cliente.idCliente : '';
  }
  
  async setCostos() {
    this.deliveryConfig = await this._deliveryS.getDeliveryConfig()
    this.order.totales.tax = this.deliveryConfig.costo
    this.order.totales.grand_total = this.deliveryConfig.costo + this.order.totales.subtotal
  }

  

  async setDelivery( changes ) {
    this.delivery = changes.delivery
    this.deliveryInvalidForm = changes.invalid
  }

  async setPickup( changes ) {
    console.log(changes);
    this.order.pickup = changes.pickup
    this.pickupValidForm = changes.valid
  }

  getErrorMessage() {
    if ( this.payForm.hasError( 'required' ) ) {
      return 'Este campo es requerido';
    }
  }

  validatePay(){
    if ( this.deliveryInvalidForm && !this.order.pay_method   ) {
      return false
    } else if ( !this.pickupValidForm && !this.order.pay_method) {
      return false
    } else {
      return true
    }
  }

  onSubmit() {
    this.order.buyer = this.buyer
    this.order.delivery = this.delivery
    this.order.ship_method = 'delivery'
    localStorage.setItem( 'gdev-ship', JSON.stringify( this.delivery ) )

    var alertBody: MessageAlertModel = new MessageAlertModel(
      'Transacción completada',
      'pregunta',
      'Ir a tienda', 
      'Ir a Cuenta' )

    this._orders.saveOrder( this.order )
      .then( () => {
        this._alert.sendRequestAlert( alertBody ).afterClosed()
          .subscribe( resp => {
            resp
              ? this.router.navigate( [ '/tienda' ] )
              : this.router.navigate( [ '/tienda/cuenta' ] );
          })
      } )
  }

}
