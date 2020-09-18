import { Component, OnInit } from '@angular/core';
import { PickupOrder } from '../../order.model';
import { ShipService } from '../ship.service';
// import { FullCalendarService } from '../../../../Gdev-Tools/calendar/calendar.service';
import { CartService } from '../../cart.service';
import { HorarioLaboral } from '../../../../../Gdev-Tools/calendar/select-date/select-date.component';
import { AlertService } from '../../../../../Gdev-Tools/alerts/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupLoginComponent } from '../../../clientes/clientes-login/popup-login/popup-login.component';

@Component({
  selector: 'app-pickup-form',
  templateUrl: './pickup-form.component.html',
  styleUrls: ['./pickup-form.component.scss']
})
export class PickupFormComponent implements OnInit {

  citas: any
  pickupForm: PickupOrder
  pickupByOther: boolean = false
  cita_disponible: string
  eventDuration: string = '00:15'

  horarioLaboral: HorarioLaboral[] = [
    { startTime: '08:00', endTime: '17:00', daysOfWeek: [ 1, 2, 3, 4, 5 ] },
    { startTime: '08:00', endTime: '14:00', daysOfWeek: [ 6 ] }
  ]

  pickup_date:Date
  pickup_hour: string

  constructor (
    private _ship: ShipService,
    private _cart: CartService,
    private _alerta: AlertService,
    private _dialog: MatDialog
  ) {
    this.pickupForm = {
      branch: '',
      pickup_date: new Date(),
    }
   }

  ngOnInit(): void {
  }


  setBranchHours() {
    var horario = this._ship.horarioSucursales.find( suc => {
      suc.brach == this.pickupForm.branch
    } )
    if ( horario.abre.hours == 0 ) horario.abre.hours == +'00'
    if ( horario.cierra.hours == 0 ) horario.cierra.hours == +'00'


    var abre = `${ horario.abre.hours }:${ horario.abre.minutes }`
    var cierra = `${ horario.cierra.hours }:${ horario.cierra.minutes }`
    this.horarioLaboral = [
      { startTime: abre, endTime: cierra, daysOfWeek: [ 1, 2, 3, 4, 5, 6 ] }
    ]
  }


  async clickDate( fecha ) {

    var horarioValido = await this._ship.checkHorarioValido( fecha, this.pickupForm.branch, 'pickup' )
    if ( horarioValido ) {

      this.pickupForm.pickup_date = fecha
      this.cita_disponible = 'disponible'

    } else {
    }
    
  }
  
  async setPickupDate(event) {
    console.log( this.pickup_date, this.pickup_hour );
    let hour = +this.pickup_hour.split( ':' )[ 0 ]
    let min = +this.pickup_hour.split( ':' )[ 1 ]
    if ( this.pickup_date ) {
      this.pickup_date.setHours( hour, min )
      var horarioValido = await this._ship.checkHorarioValido( this.pickup_date, this.pickupForm.branch, 'pickup' )
      if ( horarioValido ) {
        
        this.pickupForm.pickup_date = this.pickup_date
        this.cita_disponible = 'disponible'
        
      } else {
        this._alerta.sendMessageAlert('Esta fecha está ocupada ¿podrías elegir otra por favor?')
      }

    }
  }

  savePickup() {
    console.log(this.pickupForm);
    // localStorage.setItem( 'lasmotosship', JSON.stringify( this.pickupForm ) )
    var cliente = this._cart.LocalClient
    if ( !cliente ) {
      this._dialog.open( PopupLoginComponent, {
        minWidth: '400px'
      })
    } else {
      // NOTE agregar el método de pago y posteriormente guardar la cita
      // this._ship.saveCita( this.pickupForm ).then( () => {})
    }
    
  }


  horario = [
    '08:00',
    '08:15',
    '08:30',
    '08:45',
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
  ]

}
