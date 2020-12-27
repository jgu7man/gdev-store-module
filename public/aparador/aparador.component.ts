import { GdevMainService } from './../../../gdev-panel/gdev-main.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '../../../gdev-tools/commons/gdev-seo.service';
import { DatosContactoModel } from 'src/app/gdev-panel/contacto/contacto.model';
import { AlertService } from '../../../gdev-tools/alerts/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gdev-aparador',
  templateUrl: './aparador.component.html',
  styleUrls: [ './aparador.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AparadorComponent implements OnInit {

  store: DatosContactoModel
  constructor (
    private _seo: SeoService,
    private _main: GdevMainService,
    private _alert: AlertService,
    private _router: Router
  ) { }

  async ngOnInit() {
    this.store = await this._main.getContactDatos()
    if ( this.store ) {
      this._seo.generarTags( {
        title: this.store.store_name,
        description: 'Demo de E-commerce | Un producto de Marxa Digital',
        image: 'https://gdev-store.web.app/assets/icons/ms-icon-310x310.png'
      })
    }
  }

}
