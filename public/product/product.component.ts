import { Component, OnInit, Input, OnChanges, Inject, ViewChild, ElementRef } from '@angular/core';
import { GdevCommonsService } from 'src/app/Gdev-Tools/commons/gdev-commons.service';
import { SeoService } from 'src/app/Gdev-Tools/commons/gdev-seo.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Location } from '@angular/common';
import { WishlistService } from '../wishlist/wishlist.service';
import { MobileNavbarService } from '../tienda-navbar/mobile-navbar.service';
import { GdevStorePublicService } from '../gdev-store-public.service';
import { Loading } from 'src/app/Gdev-Tools/loading/loading.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {

  private _product = new BehaviorSubject<{}>( {} )
  @Input() set product( object: {} ) { this._product.next( object ) }
  get product() { return this._product.getValue() }
  public Product: any

  @Input() catego
  @Input() onlyProduct: boolean = true
  @ViewChild('details') details: HTMLElement

  public sended: boolean = false
  constructor (
    private _tienda: GdevStorePublicService,
    private _commons: GdevCommonsService,
    private _seo: SeoService,
    private _snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer, 
    private _dialog: MatDialog,
    private _ruta: ActivatedRoute,
    private ft: AngularFireStorage,
    public location: Location,
    public wishlist: WishlistService,
    private navbar: MobileNavbarService
  ) {
  }
  
  ngOnInit() {
    this._product.subscribe( product => {
      if ( !product || Object.keys(product).length == 0 ) {
        var idProduct = this._ruta.snapshot.paramMap.get( 'id' )
        if ( idProduct ) { this.loadProduct( idProduct ) }
      } else {
        this.Product = this.product
      }
    })
    
  }
  
  async loadProduct( idProduct ) {
    this.Product = await this._tienda.getProduct( idProduct )
    var catego = this._ruta.snapshot.params[ 'catego' ]
    
    this.navbar.title = this.navbar.title != 'Tienda' ?
    this.Product.referencia : 'Tienda';
    
    this.catego = catego ? catego : this.Product.categorias[ 0 ]
    this.setSeoConf()
  }
  
  ngOnChanges(): void {
    this._product.subscribe( product => {
      this.Product = product
      // this.setSeoConf()
    } )
  }

  scroll() {
    let el = document.getElementById( 'product_more' );
    el.scrollIntoView();
  }


  setSeoConf() {
    if ( this.Product[ '#Link de youtube' ] ) {
      this.Product[ '#Link de youtube' ] = this.convertYTlink( this.Product[ '#Link de youtube' ] )

    }

    this._commons.setTitle( this.Product[ 'referencia' ] + ' - Las motos' )
    this._seo.generarTags( {
      title: this.Product[ 'referencia' ],
      description: this.Product[ 'descripcion' ],
      image: this.Product[ 'imagenUrl' ]['url'],
      slug: `tienda/categoria/${this.catego}/${this.Product[ 'id' ]}`
    } )
  }



  formSended(event) {
    this.sended = event
    this._snackBar.open('Mensaje enviado', 'OK', {duration: 5000})
  }

  convertYTlink( link: any ) {
    let Link: any = typeof link == 'string' ?
      link.replace( 'watch?v=', 'embed/' ) :
      link.changingThisBreaksApplicationSecurity.replace( 'watch?v=', 'embed/' );
    Link = this.domSanitizer.bypassSecurityTrustResourceUrl( Link ) 
    return Link
  }

  openImage(data) {
    var dialog = this._dialog.open( ProductReviewComponent, {
      width: '90vw', height:'98vh', data: data
    })
  }

  validateIcon(propiedad: string) {
    return this.Product[ propiedad ] == 'Si' || this.Product['#'+propiedad] == 'Si' ? true : false
  }

}



@Component( {
  templateUrl: './product-review.component.html',
  styleUrls: [ './product.component.scss' ]
} )
export class ProductReviewComponent implements OnInit {

  constructor (
    private loading: Loading,
    private _dialog: MatDialogRef<ProductReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string
  ) { }

  @ViewChild( 'imageBox' ) public imageBox: ElementRef
  @ViewChild( 'image' ) public image: ElementRef

  ngOnInit() {
    this.widthOrheight()
  }

  close() {
    this._dialog.close()
  }

  dimension: 'height' | 'width'

  async widthOrheight(){
    await this.loading.waitFor(500)
    var boxWidth = this.imageBox.nativeElement.clientWidth
    var boxHeight = this.imageBox.nativeElement.clientHeight
    var imageWidth = this.image.nativeElement.clientWidth
    var imageHeight = this.image.nativeElement.clientHeight

    console.log( { boxWidth, boxHeight, imageWidth, imageHeight } );
    if ( boxHeight < imageHeight ) {
      this.dimension = 'height'
    } else if ( boxWidth < boxHeight ) {
      this.dimension = 'height'
    } else {
      this.dimension = 'width'
    }
  }

}
