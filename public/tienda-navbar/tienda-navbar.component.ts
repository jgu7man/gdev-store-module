import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { MobileNavbarService } from './mobile-navbar.service';
import { Router } from '@angular/router';
import { GdevResponsiveService } from '../../../gdev-tools/commons/gdev-responsive.service';
import { GdevSearchService } from '../../../gdev-tools/search/gdev-search.service';
import { Loading } from 'src/app/gdev-tools/loading/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupLoginComponent } from '../clientes/clientes-login/popup-login/popup-login.component';
import { ClienteLoginService } from '../clientes/clientes-login/cliente-login.service';
import { GdevMainService } from 'src/app/gdev-panel/gdev-main.service';

@Component({
  selector: 'app-tienda-navbar',
  templateUrl: './tienda-navbar.component.html',
  styleUrls: ['./tienda-navbar.component.scss'],
})
export class TiendaNavbarComponent implements OnInit {

  brandLogo: string
  @Input() open: boolean = false
  queryTofind: string = ''


  constructor (
    public cart: CartService,
    public responsive: GdevResponsiveService,
    public _navbar: MobileNavbarService,
    private _search: GdevSearchService,
    private _router: Router,
    private _loading: Loading,
    public login: ClienteLoginService,
    private _dialog: MatDialog,
    private _main: GdevMainService
  ) {
    this.brandLogo = !responsive.small ?
      'assets/img/lasmotos-logotipo-h-trans-neg.png'
      : 'assets/img/lasmotos-logotipo-trans-neg.png'

    this._main.getBrandInfo().subscribe(info => {
      if (info) this.brandLogo = info.headLogo.url
      else this.brandLogo
    })
  }

  menuTrigger() {
    $( "#menuTrigger" ).toggleClass( 'rotate' )
    // if ( window.screen.width <= 500 ) $( "#menuList" ).slideToggle()
    this._navbar.open = !this._navbar.open
    console.log( this._navbar.open );
    this._navbar.toggleMenu.next(this._navbar.open)
  }

  ngOnInit() {
    this.login.cliente$.subscribe( cliente => {
      if (cliente) localStorage.setItem( 'gdev-cliente', JSON.stringify( cliente ) );
    })

    $( '#page_menu' ).hover(
      () => $( '#menu-pagina' ).slideDown(),
      () => $( '#menu-pagina' ).slideUp()
    )


  }

  expandSearch() {
    $('.buscar-input').addClass('expand-input')
    $('#buscar').css('justify-content', 'left')
    $('#unexpand').toggle()
  }

  unExpand() {
    $('.buscar-input').removeClass('expand-input')
    $('#buscar').css('justify-content', 'center')
    $('#unexpand').toggle()
  }

  onSearch() {
    this._search.onSearchByString( this.queryTofind, 'tienda/productos/referencias', 'referencia' ).then( ( res ) => {
      var resultados = JSON.parse( sessionStorage.getItem( 'gdev-search' ) )
      if ( resultados ) sessionStorage.removeItem( 'gdev-search' )
      sessionStorage.setItem( 'gdev-search', JSON.stringify( res ) )
      this._router.navigateByUrl( '/tienda', { skipLocationChange: true } ).then( () => {
        this._router.navigate( [ '/tienda/resultados' ] )
      })
      console.log(res);
    })
  }

  openLoginDialog() {
    this._dialog.open( PopupLoginComponent,
    {maxWidth:'50%'})
  }

}
