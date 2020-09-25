import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PayConfigModel } from './pay-config.model';

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
    private fs: AngularFirestore
  ) { }


  savePayConfig(config: PayConfigModel) {
    const ref = this.fs.doc( 'gdev-store/pay_method_config' ).ref
    ref.set({...config}, {merge: true})
  }
  
  async getAvalibleMethods() {
    const ref = this.fs.doc( 'gdev-store/pay_method_config' ).ref
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
