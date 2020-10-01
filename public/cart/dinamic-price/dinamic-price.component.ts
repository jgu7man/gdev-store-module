import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GdevStoreProductModel, Addon, ProdDesc } from '../../../panel/products/product.model';
import { CartProductModel } from '../cart-product.model';
import { CartService } from '../cart.service';
import { DinamicPriceService } from './dinamic-price.service';

@Component({
  selector: 'gdev-dinamic-price',
  templateUrl: './dinamic-price.component.html',
  styleUrls: ['./dinamic-price.component.scss']
})
export class DinamicPriceComponent implements OnInit {

  @Input() productPrice: number = 0
  @Input() descuento: ProdDesc = {cant:0, exp:'', type:'%'}
  @Input() cantidad: number = 0
  @Input() productId:string

  // cartProduct: CartProductModel
  cart: CartProductModel[]

  constructor (
    public priceS: DinamicPriceService 
  ) {
    
   }

  ngOnInit(): void {
    // this.priceS.addons$.subscribe( list => {
    //   this.cartProduct.variante.addons = list
    // } )
    // this.priceS.variety$.subscribe(change => {
    //   this.cartProduct.variante.variety = change
    // } )
    // this.productOnCart()
  }

  

}
