import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GdevStoreProductModel, ProdDesc } from '../product.model';
import { GdevStoreProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GdevStoreCategoriesService } from '../../categories/categories.service';
import { Location } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormConstructorService } from '../../../../Gdev-Tools/form-constructor/form-constructor.service';
import { MatDialog } from '@angular/material/dialog';
import { DelProdcutComponent } from '../del-prodcut/del-prodcut.component';

@Component({
  selector: 'gdev-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() public product: GdevStoreProductModel

  public defaultDesc: ProdDesc = {
    cant: 0,
    exp: `${ new Date().getFullYear() }-${new Date().getMonth()}-${new Date().getDate()}`,
    type: '%'
  }
  public imgToLoad: any;
  public precio = [ '$', /[1-9]/, /\d/, /\d/, ',', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]
  public categories: any[]
  
  @Output() closeForm: EventEmitter<any> = new EventEmitter()

  
  constructor (
    public _products: GdevStoreProductsService,
    private _categorias: GdevStoreCategoriesService,
    public location: Location,
    private _form: FormConstructorService,
    private _dialog: MatDialog,
    private router: Router
  ) {
    this.product = undefined
    this.product = new GdevStoreProductModel( '', 0, false, '', {}, '', [], [],[],[], this.defaultDesc )
  }

  async ngOnInit() {
    this.categories = await this._categorias.loadCategories()

    this._products.imageUrl.subscribe( imageUrl => {
      this.product.imagenUrl = imageUrl
    } )
    this._products.galleyImageUrl.subscribe( imageUrl => {
      this.product.galeria.push( imageUrl )
    } )


    if ( this.product.descuento ) {
      let exp = this.product.descuento.exp
      let month = exp.getMonth() + 1
      if ( month < 10 ) { month = `0${ month.toString() }` }
      else { month = `${month}` }
      
      this.defaultDesc = {
        cant: this.product.descuento.cant,
        exp: `${ exp.getFullYear() }-${ month }-${ exp.getDate() }`,
        type: this.product.descuento.type
      }
    }
    
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
    this.defaultDesc = desc
    this.product.descuento.exp = new Date(
      desc.exp.split( '-' )[ 0 ],
      desc.exp.split( '-' )[ 1 ] - 1,
      desc.exp.split( '-' )[ 2 ]
    )
  }

  onDelete() {
    var dialog = this._dialog.open( DelProdcutComponent, {
      minWidth: 320,
      data: this.product.id
    } )
    
    dialog.afterClosed().subscribe(
      () => {
        this.closeForm.emit()
        this.router.navigateByUrl( 'panel', { skipLocationChange: true } )
        .then(() => this.router.navigate(['panel/tienda/products']))
      } )
    .unsubscribe()
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
