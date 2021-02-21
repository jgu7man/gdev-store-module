import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { GdevStoreProductModel } from './product.model';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import { AlertService } from '../../../gdev-tools/alerts/alert.service';
import { finalize } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({providedIn: 'root'})
export class GdevStoreProductsService {

    imageUrl: Subject<{}> = new Subject()
    galleyImageUrl: Subject<{}> = new Subject()
    imageLoadPercent

    constructor (
        private fs: AngularFirestore,
        private ft: AngularFireStorage,
        private _alerts: AlertService,
        private location: Location
    ) { }
    
    async addProduct(product: GdevStoreProductModel) {
        try {
            
            var productId: string = product.referencia.split( ' ' ).join( '-' ).toLowerCase()
            var dotsSplit = productId.split( '.' )
            productId = dotsSplit.length == 1 ? productId : dotsSplit.join( '_' )
            
            Object.keys(product).forEach(key => {if(product[key] == undefined) delete product[key]})
            var productObject = {}
            productObject = { ...productObject, ...product }
            productObject['id'] = productId
            

            const colRef = this.fs.collection( 'tienda/productos/referencias' ).ref;

            var productCrated = await colRef.doc(productId).set( productObject )
            this._alerts.sendFloatNotification( 'Producto agregado' )
            this.location.back()
            return true
        } catch (error) {
            console.log(error);
        }
    }

    async addProductImage( file ) {
        try {
            
            const
                dateId = new Date().getTime(),
                fileName = `${ dateId }-${ file.name }`,
                path = `products/${ fileName }`,
                ref = this.ft.ref( path ),
                task = this.ft.upload( path, file );

            await task.percentageChanges().subscribe( res => {
                return this.imageLoadPercent = res
            } )

            await task.snapshotChanges().pipe(
                finalize( async () => {
                    await ref.getDownloadURL()
                        .subscribe( res => {
                            this.imageUrl.next( { url: res, alt: file.name } )
                        } )
                    return
                } )
            ).subscribe()
        } catch (error) {
            console.error(error)
            this._alerts.sendError('Error', error)
        }
    }



    async loadGalleryImage( image ) {
        try {
            let
                dateId = new Date().getTime(),
                fileName = `${ dateId }-${ image.name }`,
                path = `products/${ fileName }`,
                ref = this.ft.ref( path ),
                task = this.ft.upload( path, image )
            
            

            await task.snapshotChanges().pipe(
                finalize( async () => {
                    await ref.getDownloadURL().subscribe( res => {
                        this.imageUrl.next( { url: res, alt: image.name } )
                    } )
                    return
                } ) ).subscribe()
        } catch (error) {
            console.error(error)
            this._alerts.sendError('Error', error)
        }
    }


    async getProduct(productId: string) {
        try {
            const productRef = this.fs.collection( 'tienda/productos/referencias' ).ref.doc( productId )
            const productDoc = await productRef.get()
            var product = productDoc.data() as GdevStoreProductModel
            return product
        } catch (error) {
            console.log(error);
        }            
    }


    async updateProduct( product: GdevStoreProductModel) {
        try {
            var productObject = {}
            productObject = { ...productObject, ...product }

            const colRef = this.fs.collection( 'tienda/productos/referencias' ).ref;
            console.log(productObject);
            await colRef.doc( product.id ).update( productObject )

            this._alerts.sendFloatNotification('Producto guardado')
            return true
        } catch ( error ) {
            this._alerts.sendMessageAlert('Ups, algo falló. No se guardó')
            console.error(error);
        }
    }

    async onDelAttr( itemAttr ) {
        try {
            var itemId = itemAttr.idItem, itemAttr = itemAttr.attrItem
            const productRef = this.fs.collection( 'tienda/productos/referencias' ).ref
            productRef.doc( itemId ).update( {
                [ itemAttr ]: firebase.firestore.FieldValue.delete()
            } )
            this._alerts.sendFloatNotification('Producto eliminado')
            return 
        } catch (error) {
            console.error(error)
            this._alerts.sendError('Error', error)
        }
    }


    async delProduct( productId: string ) {
        try {
            const productRef = this.fs.collection( 'tienda/productos/referencias' ).ref
            await productRef.doc( productId ).delete()
            return true
        } catch ( error ) {
            console.error( error );
            this._alerts.sendError('Error', error)
        }
    }

}