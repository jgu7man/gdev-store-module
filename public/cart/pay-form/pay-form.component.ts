import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DeliveryConfig } from 'src/app/gdev-store/panel/store-config/delivery-config/delivery-config.model';
import { ClienteModel } from '../../clientes/cliente.model';
import { DeliveryAddress, ProductOrdered, OrderModel, Buyer } from '../order.model';
import { StoreConfigService } from '../../../panel/store-config/store-config.service';
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
  @Input() total_pagar: number = 0
  deliveryConfig: DeliveryConfig
  constructor (
    private _storeConfig: StoreConfigService,
    private _orders: OrdersService,
    private _alert: AlertService,
    private router: Router
  ) {
    this.delivery = {
      address: '',
      depto: '',
      city: '',
      state: '',
      country: 'México',
      delivery_date: new Date(),
    }
    this.buyer = {
      name: '',
      email: '',
      celular: '',
    }
   }

  async ngOnInit() {
    this.order = JSON.parse( localStorage.getItem( 'gdev-order' ) )
    this.setBuyer()
    this.setCostos()
  }
  
  async setBuyer() {
    this.cliente = JSON.parse( localStorage.getItem( 'gdev-cliente' ) )
    this.buyer.name = this.cliente.nombre ? this.cliente.nombre : '';
    this.buyer.celular = this.cliente.celular ? this.cliente.celular : '';
    this.buyer.email = this.cliente.email ? this.cliente.email : '';
  }
  
  async setCostos() {
    this.deliveryConfig = await this._storeConfig.getDeliveryConfig()
    this.order.totales.tax = this.deliveryConfig.costo
    this.order.totales.grand_total = this.deliveryConfig.costo + this.order.totales.subtotal
  }

  getErrorMessage() {
    if ( this.payForm.hasError( 'required' ) ) {
      return 'Este campo es requerido';
    }
  }

  onSubmit() {
    this.order.buyer = this.buyer
    this.order.delivery = this.delivery
    this.order.ship_method = 'delivey'
    localStorage.setItem( 'gdev-shp', JSON.stringify( this.delivery ) )

    var alertBody: MessageAlertModel = new MessageAlertModel('Transacción completada', 'pregunta', 'Ir a tienda', 'Ir a Cuenta')

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
