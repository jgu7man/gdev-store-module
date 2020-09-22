import { Component, OnInit } from '@angular/core';
import { DatosContactoModel } from './contacto.model';
import { GdevStoreService } from '../gdev-store.service';

@Component({
  selector: 'gdev-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  datosContacto: DatosContactoModel

  constructor (
    public storeS: GdevStoreService
  ) {
    this.datosContacto = new DatosContactoModel('','','','','','','')
   }

  ngOnInit(): void {
    this.getDatos()
  }
  
  async getDatos() {
    this.datosContacto = await  this.storeS.getStoreContact()
  }

}
