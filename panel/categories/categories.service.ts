import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { GdevStoreCategoryModel } from './category.model';
import { AlertService } from 'src/app/Gdev-Tools/alerts/alert.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GdevStoreCategoriesService {

    /**Defines the path where the categories will be saved.
     * Need to be a strings with slashs and must be even number of sections
     * Example: `collection/document/collection`: even number = 3
    */
    public path: string

    categories$: Observable<any> = new Observable()

    constructor (
        private fs: AngularFirestore,
        private _alerta: AlertService
    ) {
     }

   
    

    async loadCategories() {
        try {
            const productsDocRef = this.fs.doc( 'tienda/productos' ).ref;
            const productDoc = await productsDocRef.get()
            var categoList: GdevStoreCategoryModel[] = await productDoc.get('categorias')
                

            
            return categoList
        } catch (error) {
            console.error(error)
        }
        
    }


    async addCategory( category: GdevStoreCategoryModel ) {
        try {
            const productsDoc = this.fs.doc( `tienda/productos` ).ref
            var categoDoc = await productsDoc.get()
            var categoList: GdevStoreCategoryModel[]
            if ( categoDoc.exists ) {
                categoList = await categoDoc.get( 'categorias' )
                let categoFinded = categoList.findIndex( c => c.name == category.name )
                categoFinded >= 0
                    ? this._alerta.sendMessageAlert( 'Esta categoría ya existe, elige otro nombre' )
                    : categoList.push( category );
                await productsDoc.set( { categorias: categoList }, { merge: true } )
            } else {
                categoList = [ category ]
                await productsDoc.set({categorias: categoList})
            }



            return 


            
        } catch (error) { console.error( error ); }
    }




    async editCategory( category: GdevStoreCategoryModel ) {
        try {
            const productsDocRef = this.fs.doc( `tienda/productos` ).ref
            var productsDoc = await productsDocRef.get()
            var categoriasList: GdevStoreCategoryModel[] = await productsDoc.get( 'categorias' )
            var categoFinded = categoriasList.findIndex( c => c.name == category.name )
            categoriasList[categoFinded] = category
            
            var categoUpdated = await productsDocRef.set( { categorias: categoriasList})

            return true



        } catch ( error ) { console.error( error ); }
    }

    async delCategory( category: GdevStoreCategoryModel ) {
        try {
            const productsDocRef = this.fs.doc( `tienda/productos` ).ref
            var productsDoc = await productsDocRef.get()
            var categoriasList: GdevStoreCategoryModel[] = await productsDoc.get( 'categorias' )
            var categoFinded = categoriasList.findIndex( c => c.name == category.name )
            categoriasList.splice(categoFinded, 1)
            await productsDocRef.set( { categorias: categoriasList } )

            return true



        } catch ( error ) { console.error( error ); }
    }
}