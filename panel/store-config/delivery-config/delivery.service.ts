import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from 'src/app/Gdev-Tools/alerts/alert.service';
import { DeliveryConfig } from './delivery-config.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor (
    private fs: AngularFirestore,
    private alert: AlertService
  ) { }
  
  async getDeliveryConfig() {
    let config = await this.fs.collection( 'tienda' ).ref.doc( 'delivery' ).get()
    return config.data() as DeliveryConfig
  }

  saveDeliveryConfig(config) {
    this.fs.collection( 'tienda' ).ref.doc( 'delivery' )
      .set( config, { merge: true } )
      .then( () =>
        this.alert.sendFloatNotification( 'Configuración guardada' )
      )
  }
}
