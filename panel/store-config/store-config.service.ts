import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from '../../../Gdev-Tools/alerts/alert.service';
import { DeliveryConfig } from './delivery-config/delivery-config.model';

@Injectable({
  providedIn: 'root'
})
export class StoreConfigService {

  constructor (
    private fs: AngularFirestore,
    private alert: AlertService
  ) { }
  
  async getDeliveryConfig() {
    let config = await this.fs.collection( 'gdev-store' ).ref.doc( 'delivery_config' ).get()
    return config.data() as DeliveryConfig
  }

  saveDeliveryConfig(config) {
    this.fs.collection( 'gdev-store' ).ref.doc( 'delivery_config' )
      .set( config, { merge: true } )
      .then( () =>
        this.alert.sendFloatNotification( 'Configuración guardada' )
      )
  }
}
