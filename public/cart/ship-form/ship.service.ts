import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
// import { ContactoService } from './contato.service';
import { AlertService } from 'src/app/Gdev-Tools/alerts/alert.service';
import { Time } from '@angular/common';
import { PickupOrder } from '../order.model';

@Injectable({ providedIn: 'root' })
export class ShipService {
    cita: PickupOrder
    public citaFecha: any
  public citas: any
  
  horarioSucursales: SucursalHorario[] = [
    { brach: 'Riohacha', abre: { hours: 8, minutes: 0 }, cierra: { hours: 16, minutes: 30 } },
    { brach: 'Santa Marta', abre: { hours: 8, minutes: 0 }, cierra: { hours: 15, minutes: 30 } }
  ]
    constructor(
        private fs: AngularFirestore,
        private _alerta: AlertService
    ) {}
    
    async saveCita( cita: PickupOrder ) {
        try {
            await this.fs.collection( 'panel/tienda/pickups' ).ref.doc( cita.orderId ).set( cita )
            return
        } catch (error) {
                        
        }
        
    }

    async checkHorarioValido(ship_date: Date, brach: string, ship_method: string) {
    
        var horarioPasado = await this.checkHorarioPasado(ship_date)
        var horarioLaboral = await this.checkHorarioLaboral(ship_date, brach)
      var horarioDisponible = await this.checkAvaliblePickBranchHours(ship_date, brach, ship_method)

        if (horarioPasado) {

            this._alerta.sendMessageAlert('La fecha y hora que elegiste ya pasaron. Por favor elige otra')

            return false

        } else if ( !horarioLaboral ) {
            var horario = this.horarioSucursales.find( suc => {
                return suc.brach == brach
            } )

            this._alerta.sendMessageAlert( `La fecha y hora que elegiste no están dentro de nuestro horario de atención. Nuestro horario para citas es de Lunes a Viernes de ${ horario.abre.hours }:${ horario.abre.minutes } a ${ horario.cierra.hours }:${ horario.cierra.minutes}`)

            return false

        } else if (!horarioDisponible) {

            this._alerta.sendMessageAlert('La fecha y hora que elegiste ya están ocupados por varios clientes. Por favor elige otra.')

            return false

        } else {

            return true

        }
    }

    async checkHorarioPasado(ship_date: Date) {
        var today = new Date()
        return ship_date > today ? false : true
    }
    


    async checkHorarioLaboral(ship_date: Date, brach: string) {
      var horario = this.horarioSucursales.find( suc => {
          return suc.brach == brach
        })

        const diaSemana = ship_date.getDay(),
            hora = ship_date.getHours()
        // Descartar domingos
        if(diaSemana == 0) return false
        //Descartar horario semanal
        else if (hora <= horario.abre.hours || hora > horario.cierra.hours) return false 
        // Descartar sabado por la tarde
        else if (diaSemana == 6 && (hora <= 8 || hora >= 13)) return false
        // Confirmar horario disponible
        else return true

    }

    async checkAvaliblePickBranchHours(ship_date: Date, brach: string, ship_method: string) {

        var docs = await this.fs.collection(`panel/tienda/${ship_method}s`).ref
            .where('branch', '==', brach)
            .where('pickup_date', '==', ship_date)
            .get()

        return docs.size > 2 ? false : true

    }

    async getCitasHours(brach: string) {
        var today = new Date()
        var docs = await this.fs.collection('citas').ref
            .where('brach', '==', brach)
            .where('fecha', '>=', today).get()
            
        var citas = []
            docs.docChanges().forEach(res => {
                var fecha = res.doc.data().hora.toDate()
                citas.push({start: fecha});
            })
        this.citas = citas

        return this.citas
    }

    async getCitaPorFecha(brach, date) {
        var fecha = new Date(date)

        var docs = await this.fs.collection('citas').ref
            .where('brach', '==', brach)
            .where('dia', '==', fecha)
            .get()
            
        var citas = docs.size
        if (citas == 0) {

            this.citaFecha = this.cita
        
        } else {
            var citaFecha = []
            docs.forEach(doc => {
                citaFecha.push({
                        data: doc.data(),
                        dia: doc.data().dia.toDate(),
                        hora: doc.data().hora.toDate()
                    })
            })

            this.citaFecha = citaFecha[0]
        }
                
        return  this.citaFecha
    }

    async updateCita(cita: PickupOrder) {
        await this.fs.collection('panel/tienda/pickups').ref.doc(cita.orderId).update(cita).then(res => {
            alert('Cita actualizada correctamente')
        })
    }
}


export interface SucursalHorario {
  brach: string,
  abre: Time,
  cierra: Time
}