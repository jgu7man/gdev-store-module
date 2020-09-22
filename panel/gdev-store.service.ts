import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatosContactoModel } from './contacto/contacto.model';
import { AlertService } from '../../Gdev-Tools/alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class GdevStoreService {

  constructor (
    private fs: AngularFirestore,
    private _alert: AlertService
  ) { }
  
  addStoreInfo() {
    
  }

  async addStoreContact( datos: DatosContactoModel ) {
    
    await this.fs.collection( 'gdev-store' ).ref.doc( 'datos_contacto' )
      .set( { ...datos }, { merge: true } )
    
    this._alert.sendFloatNotification('Datos guardados')
  }

  async getStoreContact() {
    var doc = await this.fs.collection( 'gdev-store' ).ref.doc( 'datos_contacto' ).get()
    return doc.data() as DatosContactoModel
  }
}
