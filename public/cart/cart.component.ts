import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartProductModel } from './cart-product.model';
import { MobileNavbarService } from '../tienda-navbar/mobile-navbar.service';
import { ProductOrdered, OrderModel, OrderTotales } from './order.model';
import { Router } from '@angular/router';
import { Loading } from 'src/app/Gdev-Tools/loading/loading.service';
import { ClienteModel } from '../clientes/cliente.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: CartProductModel[]
  order: OrderModel
  totales: OrderTotales
  constructor (
    public cart: CartService,
    private navbar: MobileNavbarService,
    private loading: Loading,
    private router: Router
  ) {

    this.totales = { grand_total: 0, tax: 0, subtotal: 0, }
    this.order = new OrderModel([],this.totales, '', false, new Date())
  }
  
  async ngOnInit() {
    this.navbar.title = 'Carrito'
    await this.getProducts()
  }


  async getProducts() {
    this.products = await this.cart.getProductsInCart()
    return console.log(this.products);
  }

  get precio_total() {
    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'gdev-cart' ) )
    var totales = []
    if(this.products) {
      this.products.forEach( cartProd => {
        // let product = localCart.find( prod => prod.productId == cartProd.productId )
        totales.push( cartProd.cant * cartProd.unit_precio)
      } )
    }
    var amount = totales.reduce( function ( a, b ) {
      return b == null ? a : a + b;
    }, 0 );
    return this.products ? amount : 0
  }


  async confirmOrder() {
    // var productsOrder: ProductOrdered[] = [] 
    var localCart: CartProductModel[] = JSON.parse( localStorage.getItem( 'gdev-cart' ) )

    await this.loading.asyncForEach( this.products, async ( product: CartProductModel ) => {
      
      let cant = localCart.find(
        prod => prod.productId == product.productId ).cant
      
      let prodOrdered: ProductOrdered = {
        id: product.productId,
        reference: product.description.referencia,
        cant: cant,
        unit_price: product.description.precio,
        cant_price: cant * product.description.precio
      }
  
      return this.order.products.push(prodOrdered)
    })

    this.order.totales.subtotal = this.precio_total
    localStorage.setItem( 'gdev-order', JSON.stringify( this.order ) )
    
    this.router.navigate(['tienda/cuenta/pay'])
    
  }

}
