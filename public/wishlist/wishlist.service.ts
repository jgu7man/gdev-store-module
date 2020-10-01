import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WishlistProduct } from './wishlist-product.model';
import { GdevStoreProductModel } from '../../panel/products/product.model';
import { Loading } from 'src/app/Gdev-Tools/loading/loading.service';
import { ClienteModel } from '../clientes/cliente.model';

@Injectable( {
  providedIn: 'root'
} )
export class WishlistService {

  wishlist: WishlistProduct[] = []

  constructor (
    private fs: AngularFirestore,
    private loading: Loading
  ) { }
  

  totalWishlistItems() {
    var wishlist = this.LocalWishlist
    if ( wishlist ) {
      var amount = wishlist.reduce( function ( a, b ) {
        return b[ 'cant' ] == null ? a : a + b[ 'cant' ];
      }, 0 );
      console.log(amount);
      return amount
    } else {
      return 0
    }
  }

  get LocalClient() {
    var cliente: ClienteModel = JSON.parse( localStorage.getItem( 'gdev-cliente' ) )
    return cliente ? cliente : false
  }

  get LocalWishlist() {
    var localwish = JSON.parse( localStorage.getItem( 'gdev-wishlist' ) )
    return localwish ? localwish : false
  }

  setLocalWishlist( wishlist ) {
    localStorage.setItem( 'gdev-whislist', JSON.stringify( wishlist ) )
  }

  async getWishlist() {
    if ( !this.LocalWishlist ) {
      // console.log('no hay localwishlist');
      if ( this.LocalClient ) {
        try {
          var tempWishlist = []
          var wishdocs = await this.fs.collection( 'clientes' ).ref
            .doc( this.LocalClient.idCliente )
            .collection( 'wishlist' ).get()

          if ( wishdocs.size > 0 ) {
            await this.loading.asyncForEach(
              wishdocs.docs, async ( doc ) => {
                tempWishlist.push( doc.id )
              } )
            return this.wishlist = tempWishlist
          } else {
            return this.wishlist = []
          }
        } catch ( error ) {
          return this.wishlist = []
        }
      } else {
        return this.wishlist = []
      }
    } else {
      return this.wishlist = this.LocalWishlist
    }
    
  }

  async updateProduct( productId ) {
    await this.getWishlist()
    var productIndex = this.wishlist.findIndex( prod => prod.productId == productId )
    if ( productIndex > -1 ) {
      this.wishlist.splice( productIndex, 1 )
      this.setLocalWishlist( this.wishlist )
      if ( this.LocalClient ) {
        await this.delProductOn( this.LocalClient.idCliente, productId )
      }

    } else {
      this.wishlist.push( {
        productId: productId,
        agregado: new Date(),
      } )
      this.setLocalWishlist( this.wishlist )
      if ( this.LocalClient ) {
        await this.setProductOn( this.LocalClient.idCliente, productId )
      }
    }
  }

  private async setProductOn( idCliente, idProducto ) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const wishlistRef = clienteRef.collection( 'wishlist' )
      await wishlistRef.doc( idProducto ).set( {
        agregado: new Date()
      } )
      return true
    } catch ( error ) {
      console.error( 'No se agregó: ', error );
      return false
    }
  }

  private async delProductOn( idCliente, idProducto ) {
    try {
      const clienteRef = this.fs.collection( 'clientes' ).ref.doc( idCliente )
      const wishlistRef = clienteRef.collection( 'wishlist' )
      await wishlistRef.doc( idProducto ).delete()
      return true
    } catch ( error ) {
      console.error( 'No se agregó: ', error );
      return false
    }
  }

  checkOnWishlist( productId ) {
    var product: WishlistProduct =
      this.wishlist.find( prod => prod.productId == productId )
    return product ? product : false
  }

  async updateOnlogin( idCliente ) {
    await this.getWishlist()
    const wishlistRef = this.fs.collection( 'clientes' ).ref.doc( idCliente ).collection( 'wishlist' )
    var cloudWishlist = await wishlistRef.get()
    
    var Wishlist:WishlistProduct[] = []
    if ( cloudWishlist.size > 0 ) {
      await this.loading.asyncForEach( cloudWishlist.docs, async ( doc ) => {
        Wishlist.push( doc.id )
      } )
      
      
      
      if ( this.wishlist.length > 0 ) {
        await this.loading.asyncForEach( this.wishlist,
          async ( prod: WishlistProduct ) => {
            let Prod = Wishlist.find( cartProd => cartProd.productId == prod.productId )
            if ( Prod ) this.setProductOn( idCliente, prod )
        } )
        await this.loading.asyncForEach( Wishlist,
          async ( prod: WishlistProduct ) => {
            let Prod = this.wishlist.find( cartProd => cartProd.productId == prod.productId )
            if ( Prod ) this.setProductOn( idCliente, prod )
        })
        this.setLocalWishlist(this.wishlist)
      } else {
        this.setLocalWishlist( Wishlist )
      }



    } else {
      if ( this.wishlist.length > 0 ) {
        this.wishlist.forEach( prod => {
          this.setProductOn( idCliente, prod )
        } )
      }


    
    }
  }


  async getProductsInWishlist() {
    await this.getWishlist()
    var products: WishlistProduct[] = []
    await this.loading.asyncForEach( this.wishlist, async ( product: WishlistProduct ) => {
      const productCol = this.fs.collection( 'productos' ).ref
      const productDoc = await productCol.doc( product.productId ).get()
      product.description = productDoc.data() as GdevStoreProductModel
      products.push( product )
    } )
    return products
  }






}
