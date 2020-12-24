import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../wishlist/wishlist.service';
import { CartService } from '../../cart/cart.service';
import { MobileNavbarService } from '../../tienda-navbar/mobile-navbar.service';
import { GdevStorePublicService } from '../../gdev-store-public.service';
import { SeoService } from '../../../../gdev-tools/commons/gdev-seo.service';
import { GdevStoreProductModel } from '../../../panel/products/product.model';
import { Location } from '@angular/common';

@Component({
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  products: GdevStoreProductModel[]
  categoria: string
  queryLimit: number = 12
  constructor (
    private _tienda: GdevStorePublicService,
    private _ruta: ActivatedRoute,
    public wishlist: WishlistService,
    public cart: CartService,
    private navbar: MobileNavbarService,
    private seo: SeoService,
    public location: Location
  ) {
    this.categoria = this._ruta.snapshot.params['catego']
    this.navbar.title = this.categoria
    this.seo.generarTags( {
      title:this.categoria
    })
   }

  async ngOnInit() {
    this.products = await this._tienda.getArticulosFilter( this.categoria, this.queryLimit ) as GdevStoreProductModel[]
    console.log( this.products );
    this.wishlist.getWishlist()
    this.cart.getCart()
  }

  get lastItem() {
    var products = this.products.length
    return products % this.queryLimit > 0 ? true : false
  }

  async loadMore() {
    var last = this.products[ this.products.length - 1 ]
    var lastId = last.id
    var more = await this._tienda.getMoreProducts( this.categoria, this.queryLimit, lastId )
    more.forEach(product => this.products.push(product))
  }

  

}
