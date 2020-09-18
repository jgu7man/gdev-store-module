import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { CartProductModel } from '../cart-product.model';

@Component({
  selector: 'app-addcart-btn',
  templateUrl: './addcart-btn.component.html',
  styleUrls: ['./addcart-btn.component.scss']
})
export class AddcartBtnComponent implements OnInit {

  @Input() productId: string
  @Input() varieties: any[]
  cart: CartProductModel[]
  constructor (
    public _cart: CartService
  ) { }

  ngOnInit(): void {
  }
  
  get productOnCart() {
    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'lasmotoscart' ) )
    if ( localCart ) {
      var product = localCart.find( prod => prod.productId == this.productId )
      if(product) return product
    }
  }

  addProdCart() {
    this._cart.updateProduct(this.productId, 1)
  }

  

  async addCant() {
    if(this.productOnCart)
      this._cart.updateProduct( this.productId, this.productOnCart.cant + 1 )
  }

  async removeCant() {
    if ( this.productOnCart )
      this._cart.updateProduct( this.productId, this.productOnCart.cant - 1 )
  }

}
