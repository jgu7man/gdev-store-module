import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WishlistProduct } from '../wishlist-product.model';
import { GdevStoreProductModel } from '../../../panel/products/product.model';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product-on-wishlist',
  templateUrl: './product-on-wishlist.component.html',
  styleUrls: ['./product-on-wishlist.component.scss']
})
export class ProductOnWishlistComponent implements OnInit {

  private _product = new BehaviorSubject<WishlistProduct>( { productId: '', } )
  @Input() set product( product: WishlistProduct ) { this._product.next( product ) }
  get product() { return this._product.getValue() }
  producto: GdevStoreProductModel

  @Output() precio_prod_total: EventEmitter<number> = new EventEmitter()

  constructor (
    private _wishlist: WishlistService
  ) { }

  ngOnInit(): void {
    this._product.subscribe( async prod => {
      // this.product = prod
      this.producto = await this._wishlist.getWishlistProductFromDB( prod.productId )
    } )
  }

  get productOnWishlist() {
    var localWishlist: WishlistProduct[] = JSON.parse( localStorage.getItem( 'gdev-wishlist' ) )
    if ( localWishlist ) {
      var product = localWishlist.find( prod => prod.productId == this.product.productId )
      if ( product ) {
        console.log(product.agregado);
        product.agregado = new Date( product.agregado ).toLocaleDateString()
        console.log( product.agregado );
        return product
      }
    }
  }

  deleteFromList() {
    this._wishlist.deleteOfWishlist(this.producto.id)
  }

}
