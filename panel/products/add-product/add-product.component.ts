import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GdevStoreProductModel, ProdDesc } from '../product.model';
import { Router } from '@angular/router';
import { GdevStoreCategoriesService } from '../../categories/categories.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GdevStoreProductsService } from '../products.service';
import { Location } from '@angular/common';
import { FormConstructorService } from '../../../../Gdev-Tools/form-constructor/form-constructor.service';

@Component({
  selector: 'gdev-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public product: GdevStoreProductModel
  public imgToLoad: any;
  public precio = [ '$', /[1-9]/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]
  public categories: any[]
  

  public defaultDesc: ProdDesc = {
    cant: 0,
    exp: `${ new Date().getFullYear() }-${ new Date().getMonth() }-${ new Date().getDate() }`,
    type: '%'
  }
  
  @Output() closeForm: EventEmitter<any> = new EventEmitter()


  constructor (
    public _products: GdevStoreProductsService,
    private _categorias: GdevStoreCategoriesService,
    public location: Location
  ) {
    this.product = undefined
    this.product = new GdevStoreProductModel( '', 0,  false, '', {}, '', [], [] )
  }

  async ngOnInit() {
    this.categories = await this._categorias.loadCategories()
    
    this._products.imageUrl.subscribe( imageUrl => {
      this.product.imagenUrl = imageUrl
    } )
    this._products.galleyImageUrl.subscribe( imageUrl => {
      this.product.galeria.push(imageUrl)
    } )


    if ( this.product.descuento ) {
      let exp = this.product.descuento.exp
      let month = exp.getMonth() + 1
      if ( month < 10 ) { month = `0${ month.toString() }` }
      else { month = `${ month }` }

      this.defaultDesc = {
        cant: this.product.descuento.cant,
        exp: `${ exp.getFullYear() }-${ month }-${ exp.getDate() }`,
        type: this.product.descuento.type
      }
    }
  }

  getImageURL(imageURL) {
    this.product.imagenUrl = imageURL
  }



  setStock( e: MatSlideToggleChange ) {
    this.product.onStock = e.checked
  }

  onLoadImg( file ) {
    this.imgToLoad = file.target.files[ 0 ]
    var reader = new FileReader()
    reader.onload = () => {
      var img: any;
      img = document.getElementById( 'imgReferencia' )
      img.src = reader.result
    }
    reader.readAsDataURL( file.target.files[ 0 ] )

    this._products.addProductImage(this.imgToLoad)
  }

  setGallery(images) {
      let files: any[] = images.value
      files.forEach( async image => {
        let currentFile = this.product.galeria.find( img => img.alt == image.name )
        if ( !currentFile ) {
          this._products.loadGalleryImage(image)
        }
      } );
    }
  
  catchVariantes(variantes) {
    this.product.variantes = variantes
  }

  catchAddons( addons ) {
    this.product.addons = addons
  }

  catchDesc( desc ) {
    this.defaultDesc = desc
    this.product.descuento.exp = new Date(
      desc.exp.split( '-' )[ 0 ],
      desc.exp.split( '-' )[ 1 ] - 1,
      desc.exp.split( '-' )[ 2 ]
    )
  }



  merge( values ) {
    this.product = { ...this.product, ...values }
  }

  onSubmit( ) {
    this._products.addProduct( this.product ).then( () => {
      this.closeForm.emit()
    })
  }
}
