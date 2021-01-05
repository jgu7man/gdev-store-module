import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MobileNavbarService } from './tienda-navbar/mobile-navbar.service';
import { GdevMainService } from '../../gdev-panel/gdev-main.service';
import { AlertService } from '../../gdev-tools/alerts/alert.service';
import { Router } from '@angular/router';
import { StoreModel } from 'src/app/gdev-panel/models/store.model';
import { IntegrationsService } from '../panel/store-config/integrations-config/integrations.service';

@Component({
  selector: 'gdev-store-public',
  templateUrl: './gdev-store-public.component.html',
  styleUrls: [ './gdev-store-public.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class GdevStorePublicComponent implements OnInit, AfterViewInit {

  @ViewChild('menu_mobile') menuMobile: MatDrawer
  constructor (
    public _navbar: MobileNavbarService,
    private _main: GdevMainService,
    private _alert: AlertService,
    private _router: Router,
    private _integrations: IntegrationsService
  ) {
    var favicon: HTMLLinkElement = document.querySelector( '[type="image/x-icon"]' )
    favicon.href = 'app/gdev-panel/assets/img/gdev-icono-trans-1x1.png'
    
    this._main.getStoreData()
      .then( (data: StoreModel ) => {
        if ( data.logoURL ) {
          // set logoURL
        }
      })
      .catch( error => {
      this._alert.sendRequestAlert( {
        message:
          "Errores adminsitrativos. Si eres administrador inicia sesión para resolverlos. Si no, disculpa las molestias",
        trueMsg: "Ir al panel",
        falseMsg: "OK",}
      ).subscribe( response => {
        if ( response ) {
          this._router.navigate(['/panel'])
        }
      })
    })
   }

  ngOnInit() {
    this.toggleMenu()
  }

  ngAfterViewInit() {
    this._integrations.setScripts()
  }

  toggleMenu( ) {
    this._navbar.toggleMenu.subscribe( ( toggle: boolean ) => {
      console.log({menu: toggle});
      toggle ? this.menuMobile.open() : this.menuMobile.close()
    })
  }

}
