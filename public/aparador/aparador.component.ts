import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SeoService } from '../../../Gdev-Tools/commons/gdev-seo.service';
import { GdevMainService } from '../../../gdev-panel/gdev-main.service';
import { DatosContactoModel } from '../../../gdev-panel/contacto/contacto.model';

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
    private _main: GdevMainService
  ) { }

  async ngOnInit() {
    this.store = await this._main.getContactDatos()
    this._seo.generarTags( {
      title: this.store.store_name,
      description: 'Demo de E-commerce | Un producto de Marxa Digital',
      image: 'https://gdev-store.web.app/assets/icons/ms-icon-310x310.png'
    })
  }

}
