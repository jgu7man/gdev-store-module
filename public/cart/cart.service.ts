import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartProductModel } from './cart-product.model';
import { Loading } from 'src/app/Gdev-Tools/loading/loading.service';
import { GdevStoreProductModel } from '../../panel/products/product.model';
import { ClienteModel } from '../clientes/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartProductModel[] = []
  
  constructor (
    private fs: AngularFirestore,
    private loading: Loading
  ) {
   }

  
  totalCartItems() {
    var cart = this.LocalCart
    if ( cart ) {
      var amount = cart.reduce( function ( a, b ) {
        return b[ 'cant' ] == null ? a : a + b[ 'cant' ];
      }, 0 );
      return amount
    } else {
      return 0
    }
  }
  

  get LocalClient() {
    var cliente: ClienteModel = JSON.parse( localStorage.getItem( 'lasmotoscliente' ) )
    return cliente ? cliente : false
  }

  get LocalCart() {
    var localCart = JSON.parse( localStorage.getItem( 'lasmotoscart' ) )
    return localCart ? localCart : false
  }

  setLocalCart( cart ) {
    localStorage.setItem( 'lasmotoscart', JSON.stringify( cart ) )
  }

  async getCart() {
    if ( !this.LocalCart ) {

      if ( this.LocalClient ) {
        try {
          var tempCart = []
          var cartdocs = await this.fs.collection( 'clientes' ).ref
            .doc( this.LocalClient.idCliente )
            .collection( 'cart' ).get()

          if ( cartdocs.size > 0 ) {
            await this.loading.asyncForEach(
              cartdocs.docs, async ( doc ) => {
                tempCart.push( doc.id )
              } )
            return this.cart = tempCart
          } else {
            return this.cart = []
          }
        } catch ( error ) {
          return this.cart = []
        }
      } else {
        return this.cart = []
      }
    } else {
      return this.cart = this.LocalCart
    }

  }

  async updateProduct( productId: string, cant: number, varieties?: [] ) {
    await this.getCart()
    console.log(this.cart);
    var productIndex = this.cart.findIndex( Prod => Prod.productId == productId )
    console.log( productIndex );
    
    if ( cant == 0 ) {
      this.cart.splice( productIndex, 1 )
      this.setLocalCart( this.cart )
      if ( this.LocalClient ) {
        await this.delProductOn( this.LocalClient.idCliente, productId )
      }

    } else {
      var product = varieties ?
        { productId, cant, varieties } : { productId, cant }
      
      if ( productIndex == -1 ){
        this.cart.push( product )
        this.setLocalCart( this.cart )
      } else {
        this.cart[ productIndex ] = product
        this.setLocalCart(this.cart)
      }

      if ( this.LocalClient ) {
        await this.setProductOn  ( this.LocalClient.idCliente, product )
      }
    }
  }

  private async setProductOn( idCliente, product ) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const cartRef = clienteRef.collection( 'cart' )
      product['added'] = new Date()
      await cartRef.doc( product.productId ).set(product)
      return true
    } catch ( error ) { console.error( 'No se agregó: ', error );
      return false
    }
  }

  private async delProductOn( idCliente, productId: string) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const cartRef = clienteRef.collection( 'cart' )
      await cartRef.doc( productId ).delete()
      return true
    } catch ( error ) {
      console.error( 'No se eliminó: ', error );
      return false
    }
  }

  checkOnCart( productId ) {
    var product: CartProductModel =
      this.cart.find( prod => prod.productId == productId )
    return product ? product : false
  }

  async updateOnlogin( idCliente ) {
    await this.getCart()
    const cartRef = this.fs.collection( 'clientes' ).ref.doc( idCliente ).collection( 'cart' )
    var cloudCart = await cartRef.get()

    var Cart: CartProductModel[] = []
    if ( cloudCart.size > 0 ) {
      await this.loading.asyncForEach( cloudCart.docs, async ( doc ) => {
        Cart.push( doc.data() )
      } )



      if ( this.cart.length > 0 ) {
        await this.loading.asyncForEach( this.cart,
          async ( prod: CartProductModel ) => {
            let Prod = Cart.find( cartProd => cartProd.productId == prod.productId )
            if ( Prod ) this.setProductOn( idCliente, prod )
          } )
        
        
        await this.loading.asyncForEach( Cart,
          async ( prod: CartProductModel ) => {
            let Prod = this.cart.find(cartProd => cartProd.productId == prod.productId )
            if ( Prod ) this.cart.push( prod )
        } )

        this.setLocalCart( this.cart )
      } else {
        this.setLocalCart( Cart )
      }



    } else {
      if ( this.cart.length > 0 ) {
        this.cart.forEach( prod => {
          this.setProductOn( idCliente, prod )
        } )
      }



    }
  }


  async getProductsInCart() {
    await this.getCart()
    var products: CartProductModel[] = []
    await this.loading.asyncForEach( this.cart, async ( product: CartProductModel ) => {
      const productCol = this.fs.collection( 'productos' ).ref
      const productDoc = await productCol.doc( product.productId ).get()
      product.description = productDoc.data() as GdevStoreProductModel
      products.push( product )
    } )
    return products
  }
}
