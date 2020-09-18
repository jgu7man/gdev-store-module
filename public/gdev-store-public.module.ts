import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GdevStorePublicRoutinModule } from './gdev-store-public-routing.module';
import { MaterialModule } from 'src/app/material.module';
// import { FullCalendarModule } from '@fullcalendar/angular';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export var options: Partial<IConfig> | ( () => Partial<IConfig> );


import { AparadorComponent } from './aparador/aparador.component';
import { AparadorMasVistosComponent } from './aparador/aparador-mas-vistos/aparador-mas-vistos.component';
import { AparadorProductosComponent } from './aparador/aparador-productos/aparador-productos.component';
import { AparadorPromoComponent } from './aparador/aparador-promo/aparador-promo.component';
import { AparadorScrollThumbnailComponent } from './aparador/aparador-scroll-thumbnail/aparador-scroll-thumbnail.component';
import { AparadorSliderComponent } from './aparador/aparador-slider/aparador-slider.component';
import { SliderComponent } from './slider/slider.component';
import { TiendaNavbarComponent } from './tienda-navbar/tienda-navbar.component';
import { MenuCategoriasComponent } from './tienda-navbar/menu-categorias/menu-categorias.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductComponent, ProductReviewComponent } from './product/product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductGalleryComponent } from './product/product-gallery/product-gallery.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { MenuPaginaComponent } from './tienda-navbar/menu-pagina/menu-pagina.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesLoginComponent } from './clientes/clientes-login/clientes-login.component';
import { MenuCuentaComponent } from './tienda-navbar/menu-cuenta/menu-cuenta.component';
import { CuentaComponent } from './clientes/cuenta/cuenta.component';
import { LoginFormComponent } from './clientes/clientes-login/login-form/login-form.component';
import { RegisterFormComponent } from './clientes/clientes-login/register-form/register-form.component';
import { SidenavComponent } from './clientes/cuenta/sidenav/sidenav.component';
import { MainMenuComponent } from './clientes/cuenta/sidenav/main-menu/main-menu.component';
import { DatosCuentaComponent } from './clientes/cuenta/datos-cuenta/datos-cuenta.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddcartBtnComponent } from './cart/addcart-btn/addcart-btn.component';
import { ProductOnCartComponent } from './cart/product-on-cart/product-on-cart.component';
import { PayFormComponent } from './cart/pay-form/pay-form.component';
import { MenuMobileComponent } from './tienda-navbar/menu-mobile/menu-mobile.component';
import { MainMenuMobileComponent } from './tienda-navbar/menu-mobile/main-menu-mobile/main-menu-mobile.component';
import { ProductActionsComponent } from './product/product-actions/product-actions.component';
import { AddWishlistComponent } from './wishlist/add-wishlist/add-wishlist.component';
import { ShipFormComponent, PickupAdverticeComponent } from './cart/ship-form/ship-form.component';
import { PickupFormComponent } from './cart/ship-form/pickup-form/pickup-form.component';
import { DeliveryFormComponent } from './cart/ship-form/delivery-form/delivery-form.component';
import { ProductOnWishlistComponent } from './wishlist/product-on-wishlist/product-on-wishlist.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { GdevStorePublicComponent } from './gdev-store-public.component';
import { PopupLoginComponent } from './clientes/clientes-login/popup-login/popup-login.component';
import { GdevToolsModule } from '../../Gdev-Tools/gdev-tools.module';

@NgModule({
  declarations: [
    GdevStorePublicComponent,
    AparadorComponent,
    AparadorMasVistosComponent,
    AparadorProductosComponent,
    AparadorPromoComponent,
    AparadorSliderComponent,
    AparadorScrollThumbnailComponent,
    SliderComponent,
    TiendaNavbarComponent,
    MenuCategoriasComponent,
    CategoriasComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductGalleryComponent,
    ProductReviewComponent,
    CategoriaComponent,
    MenuPaginaComponent,
    ClientesComponent,
    ClientesLoginComponent,
    MenuCuentaComponent,
    CuentaComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SidenavComponent,
    MainMenuComponent,
    DatosCuentaComponent,
    CartComponent,
    WishlistComponent,
    AddcartBtnComponent,
    ProductOnCartComponent,
    PayFormComponent,
    MenuMobileComponent,
    MainMenuMobileComponent,
    ProductActionsComponent,
    AddWishlistComponent,
    ShipFormComponent,
    PickupAdverticeComponent,
    PickupFormComponent,
    DeliveryFormComponent,
    ProductOnWishlistComponent,
    ResultadosBusquedaComponent,
    PopupLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GdevStorePublicRoutinModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    GdevToolsModule
  ],
  exports: [
    GdevStorePublicComponent,
  ],
  entryComponents: [
    ProductReviewComponent,
    PickupAdverticeComponent,
    PopupLoginComponent
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ]
})
export class GdevStorePublicModule { }
