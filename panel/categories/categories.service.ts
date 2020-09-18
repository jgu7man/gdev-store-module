import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { GdevStoreCategoryModel } from './category.model';
import { AlertService } from 'src/app/Gdev-Tools/alerts/alert.service';

@Injectable({providedIn: 'root'})
export class GdevStoreCategoriesService {

    /**Defines the path where the categories will be saved.
     * Need to be a strings with slashs and must be even number of sections
     * Example: `collection/document/collection`: even number = 3
    */
    public path: string

    constructor (
        private fs: AngularFirestore,
        private _alerta: AlertService
    ) { }
    

    async loadCategories() {
        try {
            const categoriesRef = this.fs.collection( 'tienda' ).ref
                .doc( 'productos' ).collection( 'categorias' )

            var categoriesRes = await categoriesRef.get()
            var categories: GdevStoreCategoryModel[] = []
            categoriesRes.forEach( catego => {
                categories.push( catego.data() as GdevStoreCategoryModel )
            } )
            return categories
        } catch (error) {
            console.error(error)
        }
        
    }


    async addCategory( category: GdevStoreCategoryModel ) {
        try {
            const categoriesCol = this.fs.collection( category.path ).ref
            var categoCreated = await categoriesCol.where( 'name', '==', category.name ).get()
            if(categoCreated.size == 0){
                await categoriesCol.doc( category.name ).set( {
                    name: category.name
                } )
            } else {
                this._alerta.sendMessageAlert('Esta categoría ya existe, elige otro nombre')
            }

            return 


            
        } catch (error) { console.error( error ); }
    }

    async editCategory( category: GdevStoreCategoryModel ) {
        try {
            const categoriesCol = this.fs.collection( category.path ).ref
            var categoryObject = {}
            categoryObject = { ...category, categoryObject }
            
            var categoUpdated = await categoriesCol.doc(category.name).set(categoryObject)

            return true



        } catch ( error ) { console.error( error ); }
    }

    async delCategory( category: GdevStoreCategoryModel ) {
        try {
            const categoriesCol = this.fs.collection( category.path ).ref
            await categoriesCol.doc(category.name).delete()

            return true



        } catch ( error ) { console.error( error ); }
    }
}