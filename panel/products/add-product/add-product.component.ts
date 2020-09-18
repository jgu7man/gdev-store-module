import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GdevStoreProductModel } from '../product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GdevStoreCategoriesService } from '../../categories/categories.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
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
  @Output() closeForm: EventEmitter<any> = new EventEmitter()
  constructor (
    public _products: GdevStoreProductsService,
    private router: Router,
    private _categorias: GdevStoreCategoriesService,
    private _form: FormConstructorService,
    public location: Location
  ) {
    this.product = undefined
    this.product = new GdevStoreProductModel( '', '', 0, false, '', {}, '', [], [] )
  }

  async ngOnInit() {
    this.categories = await this._categorias.loadCategories()
    this._products.imageUrl.subscribe( imageUrl => {
      this.product.imagenUrl = imageUrl
    } )
    this._products.galleyImageUrl.subscribe( imageUrl => {
      this.product.galeria.push(imageUrl)
    } )
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
  



  merge( values ) {
    this.product = { ...this.product, ...values }
  }

  onSubmit( ) {
    this._products.addProduct( this.product ).then( () => {
      this.router.navigateByUrl( '/panel/store', { skipLocationChange: true } ).then( () => {
        this.router.navigate( [ '/panel/store/products' ] );
      } );
    })
  }
}
