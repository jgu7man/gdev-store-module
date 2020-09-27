import { Component, OnInit } from '@angular/core';
import { DatosContactoModel } from './contacto.model';
import { GdevStoreService } from '../gdev-store.service';
import { Ubication, GeoCords } from '../../../Gdev-Tools/maps/maps.interface';

@Component({
  selector: 'gdev-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  datosContacto: DatosContactoModel
  cords: GeoCords = { lat: 0, lng: 0 }
  ubication: Ubication = {
    address: '',
    dist: '',
    city: '',
    state: '',
    country: ''
  }

  constructor (
    public storeS: GdevStoreService
  ) {
    this.datosContacto = new DatosContactoModel('','','','','','','', '',this.ubication, this.cords)
   }

  ngOnInit(): void {
    this.getDatos()
    
  }

  onUbicationChanges(ubication: Ubication) {
    this.datosContacto.ubication = ubication
  }
  
  async getDatos() {
    this.datosContacto = await this.storeS.getStoreContact()
    if ( this.datosContacto.maps ) { this.cords = this.datosContacto.maps }
  }

}
