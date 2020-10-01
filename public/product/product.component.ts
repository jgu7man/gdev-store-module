import { Component, OnInit, Input, OnChanges, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { GdevCommonsService } from 'src/app/Gdev-Tools/commons/gdev-commons.service';
import { SeoService } from 'src/app/Gdev-Tools/commons/gdev-seo.service';
import { BehaviorSubject, Subscription } from 'rxjs';
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
import { GdevStoreProductModel, Addon, ProdVariante } from '../../panel/products/product.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CartProductModel } from '../cart/cart-product.model';
import { MatRadioChange } from '@angular/material/radio';
import { CartService } from '../cart/cart.service';
import { DinamicPriceService } from '../cart/dinamic-price/dinamic-price.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  public product: GdevStoreProductModel
  priceSubs: Subscription

  @ViewChild( 'details' ) details: HTMLElement

  public sended: boolean = false
  constructor (
    private _tienda: GdevStorePublicService,
    private _commons: GdevCommonsService,
    private _seo: SeoService,
    private domSanitizer: DomSanitizer, 
    private _dialog: MatDialog,
    private _ruta: ActivatedRoute,
    public location: Location,
    public wishlist: WishlistService,
    public cart: CartService,
    private navbar: MobileNavbarService,
    public price: DinamicPriceService
  ) {
  }
  
  ngOnInit() {
    var idProduct = this._ruta.snapshot.paramMap.get( 'id' )
    if ( idProduct ) { this.loadProduct( idProduct ) }
  }

  
  
  async loadProduct( idProduct ) {
    this.product = await this._tienda.getProduct( idProduct )
    // console.log(this.product);
    this.price._product.next( this.product )
    // this.price._product.complete()
    

    this.navbar.title = this.navbar.title != 'Tienda' ?
    this.product.referencia : 'Tienda';
    
    this.setSeoConf()
  }
  

  private scroll() {
    let el = document.getElementById( 'product_more' );
    el.scrollIntoView();
  }


  setSeoConf() {
    this._commons.setTitle( this.product[ 'referencia' ])
    this._seo.generarTags( {
      title: this.product[ 'referencia' ],
      description: this.product[ 'descripcion' ],
      image: this.product[ 'imagenUrl' ]['url'],
      slug: `tienda/producto/${this.product[ 'id' ]}`
    } )
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

  ngOnDestroy() {
    // console.log( 'unsubscribe' );
    this.product = undefined
    this.price.unsubscribe()
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
