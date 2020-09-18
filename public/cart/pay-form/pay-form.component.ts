import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClienteModel } from '../../clientes/cliente.model';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent implements OnInit {

  payForm = new FormControl( '', [ Validators.required ] );
  cliente: ClienteModel
  @Input() total_pagar: number = 0
  constructor () {
    
   }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('lasmotoscliente'))
  }

  getErrorMessage() {
    if ( this.payForm.hasError( 'required' ) ) {
      return 'Este campo es requerido';
    }
  }

  onSubmit() {
    
  }

}
