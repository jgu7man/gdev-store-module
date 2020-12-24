import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SelectItem } from 'src/app/gdev-tools/commons/gdev-commons.service';
import { TextService } from '../../../../gdev-tools/text/gdev-text.service';
import { OrderModel } from '../../../public/cart/order.model';
import { PedidosService } from '../pedidos.service';
import { MailService } from '../../../../gdev-panel/mails/mail.service';

@Component({
  selector: 'gdev-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  

  estados: SelectItem[] = [
    { value: 'pendiente', viewValue: 'Pendiente' },
    { value: 'enviado', viewValue: 'Enviado' },
    { value: 'entregado', viewValue: 'Entregado' },
    { value: 'cancelado', viewValue: 'Cancelado' },
  ]

  ship_date: Date
  ship_time: string

  @Input() pedido: OrderModel
  @Output() close = new EventEmitter<boolean>();

  constructor (
    public text: TextService,
    private _pedidos: PedidosService,
    private _mails: MailService
  ) { }

  ngOnInit(): void {
  }

  fecha( date ) {
    return this.text.stringifyDate( date )
  }

  hora( date ) {
    return this.text.stringifyTime( date )
  }

  changeState() {
    this._pedidos.updatePedido( this.pedido )
    if ( this.pedido.state == 'enviado' ) {
      this._mails.sendClientMail(this.pedido.buyer.email, 'sendingOrder')
    }
  }

  catchDeliveryDate( event: MatDatepickerInputEvent<Date>) {
    this._pedidos.updatePedido( this.pedido )
  }

  catchDeliveryTime(event) {
    var hours = +event.split( ':' )[ 0 ], mins = +event.split( ':' )[ 1 ];
    console.log( this.pedido.delivery.delivery_date);
    
    if ( this.pedido.delivery.delivery_date ) {
      this.pedido.delivery.delivery_date
        .setHours( hours, mins )
    }

    this._pedidos.updatePedido(this.pedido)
    
  }


}
