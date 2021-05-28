import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { DatosContactoModel } from '../../../gdev-panel/contacto/contacto.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevMainService } from 'src/app/gdev-panel/gdev-main.service';

@Component({
  selector: 'gdev-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  getIn: boolean
  storeDatos: DatosContactoModel
  logo: string

  constructor (
    private fs: AngularFirestore,
    private _main: GdevMainService
  ) {
    this.getStoreData()
    this._main.getBrandInfo().subscribe(info => {
      console.log( info )
      if (info) this.logo = info.squareLogo.url
    })
   }

  ngOnInit(): void {
    timer( 2000 ).subscribe( ready => {
      this.getIn = true
    })
  }

  async getStoreData() {
    this.storeDatos = await (await this.fs.collection('_admin').ref.doc('datos_contacto').get()).data() as DatosContactoModel

  }

}
