import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MobileNavbarService } from './tienda-navbar/mobile-navbar.service';

@Component({
  selector: 'gdev-store-public',
  templateUrl: './gdev-store-public.component.html',
  styleUrls: [ './gdev-store-public.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class GdevStorePublicComponent implements OnInit {

  @ViewChild('menu_mobile') menuMobile: MatDrawer
  constructor(public _navbar: MobileNavbarService) { }

  ngOnInit() {
    this.toggleMenu()
  }

  toggleMenu( ) {
    this._navbar.toggleMenu.subscribe( ( toggle: boolean ) => {
      console.log({menu: toggle});
      toggle ? this.menuMobile.open() : this.menuMobile.close()
    })
  }

}
