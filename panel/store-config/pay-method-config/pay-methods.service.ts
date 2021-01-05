import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PayConfigModel } from './pay-config.model';
import { AlertService } from '../../../../gdev-tools/alerts/alert.service';
import firebase from 'firebase/app';
import 'firebase/functions'
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { MercadopagoRequest } from 'functions/src/models/mercadopago.model';

@Injectable({
  providedIn: 'root'
})
export class PayMethodsService {

  methods: MethodItem[] = [
    { value: 'tarjeta', viewValue: 'Tarjeta' },
    { value: 'efectivo', viewValue: 'Efectivo' },
    { value: 'orden', viewValue: 'Orden de compra' },
    { value: 'paypal', viewValue: 'PayPal' },
    { value: 'oxxo', viewValue: 'OXXO' },
  ]
  constructor (
    private fs: AngularFirestore,
    private _alerts: AlertService
  ) { }


  async savePayConfig(config: PayConfigModel) {
    try {
      const ref = this.fs.doc( 'tienda/pay_method' ).ref
      ref.set( { ...config }, { merge: true } )
      this._alerts.sendFloatNotification( 'Data guardada' )
      return 
    } catch (error) {
      console.error(error)
      this._alerts.sendError('Error', error)
    }
  }
  
  async getAvalibleMethods() {
    const ref = this.fs.doc( 'tienda/pay_method' ).ref
    const doc = await ref.get()
    
    return doc.exists
      ? doc.data() as PayConfigModel
      : undefined

  }

  testMercadopago(token: string) {
    const checkout = firebase.functions().httpsCallable( 'mercadopago' )
    
    const request: MercadopagoRequest = {
      access_token:token,
      items:[ {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      } ],
      action: 'create',
      back_urls: {
        success: 'http://localhost:4200/panel/tienda/config/success',
        pending: 'http://localhost:4200/panel/tienda/config/pending',
        failure: 'http://localhost:4200/panel/tienda/config/failure',
      }
    }
    
    console.log( 'make request' )
    return checkout( request )
  }

}

export interface MethodItem {
  value: string,
  viewValue
}
