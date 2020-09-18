import { Component, OnInit, Input } from '@angular/core';
import { WishlistService } from '../../wishlist/wishlist.service';
import { CartProductModel } from '../../cart/cart-product.model';
import { GdevStoreProductModel } from '../../../panel/products/product.model';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.scss']
})
export class ProductActionsComponent implements OnInit {

  @Input() product: GdevStoreProductModel
  constructor (
    public wishlist: WishlistService
  ) { }

  ngOnInit(): void {
  }

  get productOnCart() {
    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'lasmotoscart' ) )
    if ( localCart ) {
      var product = localCart.find( prod => prod.productId == this.product.id )
      if ( product ) return product
    }
  }

}
