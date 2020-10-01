import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';
import { CartProductModel } from '../cart-product.model';

@Component({
  selector: 'app-addcart-btn',
  templateUrl: './addcart-btn.component.html',
  styleUrls: ['./addcart-btn.component.scss']
})
export class AddcartBtnComponent implements OnInit {

  @Input() product:CartProductModel 
  cart: CartProductModel[]
  @Output() cantUpdated: EventEmitter<number> = new EventEmitter()
  @Output() productFinded: EventEmitter<CartProductModel> = new EventEmitter()
  constructor (
    public _cart: CartService
  ) { }

  ngOnInit(): void {
  }
  
  get productOnCart() {
    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'gdev-cart' ) )
    if ( localCart ) {
      var product = localCart.find( prod => prod.productId == this.product.productId )

      if ( product ) {
        this.cantUpdated.emit(product.cant)
        return product
      }
    }
  }

  addProdCart() {
    this._cart.updateProduct(this.product, 1)
  }


  async addCant() {
    if(this.productOnCart) {
      this._cart.updateProduct( this.product, this.productOnCart.cant + 1 )
      this.cantUpdated.emit(this.productOnCart.cant)
    }
  }

  async removeCant() {
    if ( this.productOnCart ) {
      this._cart.updateProduct( this.product, this.productOnCart.cant - 1 )
      this.cantUpdated.emit(this.productOnCart.cant)
    }
  }

}
