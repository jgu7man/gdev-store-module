import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { DatosContactoModel } from '../../../gdev-panel/contacto/contacto.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'gdev-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  getIn: boolean
  storeDatos: DatosContactoModel

  constructor (
    private fs: AngularFirestore
  ) {
    this.getStoreData()
   }

  ngOnInit(): void {
    timer( 2000 ).subscribe( ready => {
      this.getIn = true
    })
  }

  async getStoreData() {
    this.storeDatos = await ( await this.fs.collection( 'gdev-store' ).ref.doc( 'datos_contacto' ).get() ).data() as DatosContactoModel
  }

}
