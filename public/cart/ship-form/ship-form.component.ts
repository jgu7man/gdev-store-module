import { Component, OnInit } from '@angular/core';
import { DeliveryAddress, PickupOrder } from '../order.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MobileNavbarService } from '../../tienda-navbar/mobile-navbar.service';
import { ShipService } from './ship.service';
import { FullCalendarService } from '../../../../Gdev-Tools/calendar/calendar.service';

@Component({
  templateUrl: './ship-form.component.html',
  styleUrls: ['./ship-form.component.scss']
})
export class ShipFormComponent implements OnInit {

  
  cita_disponible: string
  eventDuration: string = '00:15'
  ship_method: 'pickup' | 'delivey'
  citas: any

  constructor (
    private router: Router,
    private dialog: MatDialog,
    private navbar: MobileNavbarService,
    private calendar: FullCalendarService,
    private _ship: ShipService
  ) {
    this.navbar.title = 'Envío'
    

    
   }

  async ngOnInit() {
    await this.loadOrder()
    // this.adverticeShipOptions()
  }

  

  async loadOrder() {
    var order = JSON.parse( localStorage.getItem( 'gdev-order' ) )
    if ( !order ) {
      console.log('No hay orden');
    } else {
      return true
    }
  }

  adverticeShipOptions() {
    this.dialog.open( PickupAdverticeComponent, {
      minWidth: '350px'
    })
  }

  

}


@Component( {
  templateUrl: './pickupadvertice.html'
})
export class PickupAdverticeComponent {

  constructor (
    public dialog: MatDialogRef<PickupAdverticeComponent>
  ){}
  
}