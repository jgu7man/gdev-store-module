import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileNavbarService } from '../../tienda-navbar/mobile-navbar.service';
import { ClienteModel } from '../cliente.model';

@Component({
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  cliente: ClienteModel
  constructor (
    private router: Router,
    private navbar: MobileNavbarService
  ) {
    this.navbar.title = 'Cuenta'
   }

  ngOnInit(): void {
    var cliente = JSON.parse( localStorage.getItem( 'gdev-cliente' ) )
    if ( cliente ) { this.cliente = cliente }
    else { this.router.navigate(['/tienda/login']) }
  }

}
