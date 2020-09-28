import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
import { GdevStoreProductModel } from '../panel/products/product.model';

@Injectable({ providedIn: 'root' })
export class GdevStorePublicService {
    constructor(
        private fs: AngularFirestore
    ) {
        
    }

    $sliderContent = new Subject<any>()

    async getArticulosFilter( categoria: string, limit?: number,  order?: string ) {
        // NOTE Crear el sistema de orden por nuevo, más visitado, etc
        !order ? order = 'id' : order = order
        var tiendaRef = this.fs.collection('tienda/productos/referencias').ref
        var docs = !limit ? 
            await tiendaRef.where( 'categorias', 'array-contains', categoria ).get() :
            await tiendaRef.where( 'categorias', 'array-contains', categoria )
                .limit(limit).orderBy(order, 'asc')
                .get()
        var articulos = []
        docs.forEach( doc => {
            let prod = doc.data()
            if ( !prod['id'] ) { prod['id'] = doc.id } 
            articulos.push( prod )
        } )
        console.log(articulos);
        return articulos 
    }


    async getMoreProducts( categoria: string, limit?: number, after?: string ,order?: string ) {
        !order ? order = 'id' : order = order
        var tiendaRef = this.fs.collection( 'tienda/productos/referencias' ).ref
        var docs = await tiendaRef.where( 'categorias', 'array-contains', categoria )
            .limit( limit ).orderBy( order, 'asc' ).startAfter(after).get()
        
        var articulos = []
        docs.forEach( doc => {
            let prod = doc.data()
            if ( !prod[ 'id' ] ) { prod[ 'id' ] = doc.id }
            articulos.push( prod )
        } )

        return articulos 
    }

    setSliderContent(content): Observable<any> {
        this.$sliderContent.next(content)
        return
    }

    async getProduct( idProduct: string ) {
        var tiendaRef = this.fs.collection( 'tienda/productos/referencias' ).ref
        var productDoc = await tiendaRef.doc( idProduct ).get()
        var product: GdevStoreProductModel = productDoc.data() as GdevStoreProductModel
        return product
    }



    

    
}