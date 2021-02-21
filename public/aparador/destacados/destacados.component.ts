import { Component, OnInit } from '@angular/core';
import { GdevStoreProductModel } from '../../../panel/products/product.model';
import { GdevStorePublicService } from '../../gdev-store-public.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../wishlist/wishlist.service';
import { CartService } from '../../cart/cart.service';
import { MobileNavbarService } from '../../tienda-navbar/mobile-navbar.service';
import { SeoService } from '../../../../gdev-tools/commons/gdev-seo.service';

@Component({
  selector: 'gdev-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.scss']
})
export class DestacadosComponent implements OnInit {

  products: GdevStoreProductModel[]
  queryLimit: number = 8
  constructor (
    private _tienda: GdevStorePublicService,
    private _ruta: ActivatedRoute,
    public wishlist: WishlistService,
    public cart: CartService,
    private navbar: MobileNavbarService,
    private seo: SeoService
  ) { }

  async ngOnInit() {
    this.products = await this._tienda.getArticulosFilter( 'destacados', this.queryLimit ) as GdevStoreProductModel[]
    // console.log(this.products);
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
    var more = await this._tienda.getMoreProducts( 'destacados', this.queryLimit, lastId )
    more.forEach( product => this.products.push( product ) )
  }

}
