import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProductModel } from '../cart-product.model';

@Component({
  selector: 'app-product-on-cart',
  templateUrl: './product-on-cart.component.html',
  styleUrls: ['./product-on-cart.component.scss']
})
export class ProductOnCartComponent implements OnInit {

  private _product = new BehaviorSubject<CartProductModel>( {productId:'', cant:0} )
  @Input() set product( product: CartProductModel ) { this._product.next( product) }
  get product() { return this._product.getValue() }
  producto: CartProductModel

  @Output() precio_prod_total: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this._product.subscribe(prod => this.producto = prod)
  }

  get productOnCart() {
    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'lasmotoscart' ) )
    if ( localCart ) {
      var product = localCart.find( prod => prod.productId == this.product.productId )
      if ( product ) return product
    } 
  }

}
