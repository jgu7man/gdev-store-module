import { Component, OnInit } from '@angular/core';
import { DeliveryAddress } from '../../order.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {

  delivery: DeliveryAddress
  deliveryForm:FormControl = new FormControl('', [Validators.required])
  constructor () {
    this.delivery = {
      address: '',
      depto: '',
      city: '',
      state: '',
      country: 'Colombia',
      delivery_date: new Date
    }
   }

  ngOnInit(): void {
  }

  requiredMessage() {
    return this.deliveryForm.hasError('required') ? 'Este campo es necesario' : ''
  }

  onSubmit() {
    localStorage.setItem( 'lasmotosship', JSON.stringify( this.delivery ) )
    
  }

}
