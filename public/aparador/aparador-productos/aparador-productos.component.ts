import { Component, OnInit } from '@angular/core';
import { GdevStorePublicService } from '../../gdev-store-public.service';

@Component({
  selector: 'app-aparador-productos',
  templateUrl: './aparador-productos.component.html',
  styleUrls: ['./aparador-productos.component.css']
})
export class AparadorProductosComponent implements OnInit {


  public articulos
  constructor(
    private _tienda: GdevStorePublicService
  ) { }

  async ngOnInit() {
    // this.articulos = await this._tienda.getArticulosFilter()
  }

}
