import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PayConfigModel } from './pay-config.model';
import { AlertService } from '../../../../gdev-tools/alerts/alert.service';

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
}

export interface MethodItem {
  value: string,
  viewValue
}
