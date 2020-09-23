import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GdevStoreProductModel, ProdDesc } from '../product.model';
import { GdevStoreProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GdevStoreCategoriesService } from '../../categories/categories.service';
import { Location } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormConstructorService } from '../../../../Gdev-Tools/form-constructor/form-constructor.service';

@Component({
  selector: 'gdev-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() public product: GdevStoreProductModel
  defultDesc: ProdDesc = {cant:0, exp:new Date(), type:'%'}
  public imgToLoad: any;
  public precio = [ '$', /[1-9]/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]
  public categories: any[]
  @Output() closeForm: EventEmitter<any> = new EventEmitter()
  constructor (
    public _products: GdevStoreProductsService,
    private router: Router,
    private _categorias: GdevStoreCategoriesService,
    public location: Location,
    private _ruta: ActivatedRoute,
    private _form: FormConstructorService
  ) {
    this.product = undefined
    this.product = new GdevStoreProductModel( '', 0, false, '', {}, '', [], [] )
  }

  async ngOnInit() {
    this.categories = await this._categorias.loadCategories()
    if ( !this.product.desc ) this.product.desc = this.defultDesc;
    
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

    this._products.addProductImage( this.imgToLoad )
  }

  setGallery( images ) {
    let files: any[] = images.value
    files.forEach( async image => {
      let currentFile = this.product.galeria.find( img => img.alt == image.name )
      if ( !currentFile ) {
        this._products.loadGalleryImage( image )
      }
    } );
  }

  getImageURL( imageURL ) {
    this.product.imagenUrl = imageURL
  }

  catchVariantes( variantes ) {
    this.product.variantes = variantes
  }

  catchAddons( addons ) {
    this.product.addons = addons
  }

  catchDesc( desc ) {
    this.product.desc = desc
  }



  merge( values ) {
    this.product = { ...this.product, ...values }
  }

  onSubmit() {
    this._products.updateProduct( this.product ).then( () => {
      this._form.onResetValues()
      this.closeForm.emit()
    } )
  }
}
