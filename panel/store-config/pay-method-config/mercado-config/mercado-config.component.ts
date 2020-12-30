import { Component, OnInit, Input, Renderer2, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MercadopagoData } from '../pay-config.model';
import { PayMethodsService } from '../pay-methods.service';
import { DOCUMENT } from '@angular/common';
declare let mercadopago: any

@Component({
  selector: 'gdev-mercado-config',
  templateUrl: './mercado-config.component.html',
  styleUrls: ['./mercado-config.component.scss']
})
export class MercadoConfigComponent implements OnInit {

  private _data : BehaviorSubject<MercadopagoData> = new BehaviorSubject({testAccessToken: '',
    prodAccessToken: ''})
  @Input() set data( d: MercadopagoData ) { this._data.next( d ); }
  get data() { return this._data.getValue() }

  mercadopagoForm: FormGroup

  constructor (
    public _payConfig: PayMethodsService,
    private _renderer: Renderer2, 
    @Inject( DOCUMENT ) private _document: Document,
  ) {
    this.mercadopagoForm = new FormGroup( { 
      testAccessToken: new FormControl('', [Validators.required]),
      prodAccessToken: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  disableForm() {
		return this.mercadopagoForm.valid && !this.mercadopagoForm.pristine ? false : true;
  }
  
  saveData() {
    this._payConfig.savePayConfig( { mercadopagoData: this.mercadopagoForm.value } )
    .then(() => {this.mercadopagoForm.markAsPristine({onlySelf: true})})
  }

  createButton() {
    // mercadopago.Buttons(this.paypalConfig).render("#paypal")
  }

}
