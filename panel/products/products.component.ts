import { GdevStoreCategoriesService } from './../categories/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevStoreProductModel, ProdDesc } from './product.model';
import { Router } from '@angular/router';
import { GdevStoreProductsService } from './products.service';
import { MatDialog } from '@angular/material/dialog';
import { DelProdcutComponent } from './del-prodcut/del-prodcut.component';
import { GdevIndexService } from 'src/app/Gdev-Tools/query-index/gdev-index.service';
import { GdevStoreCategoryModel } from '../categories/category.model';
import { CollapsibleTableService, Column } from '../../../Gdev-Tools/collapsible-table/collapsible-table.service';
import { Loading } from '../../../Gdev-Tools/loading/loading.service';
import { MatSelectionListChange, MatSelectionList } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: GdevStoreProductModel[]
  prodSelected: GdevStoreProductModel
  categories: string[] = []
  preDesc: ProdDesc = {cant:0,exp:new Date(),type:'%'}

  @ViewChild( 'currentProduct' ) productPanel: MatDrawer
  @ViewChild( 'listPanel' ) listPanel: MatSelectionList
  
  columns: Column[] = [
    { key: 'imagenUrl', name: 'Imagen', colspan: 2, type: 'image' },
    { key: 'referencia', name: 'Referencia', colspan: 4, type: 'string' },
    { key: 'categorias', name: 'Categorías', colspan: 3, type: 'array' },
    { key: 'enStock', name: 'Disponible', colspan: 1, type: 'boolean' },
  ]


  constructor (
    private _collapsitable: CollapsibleTableService,
    private fs: AngularFirestore,
    private loading: Loading,
    private router: Router,
    private _products: GdevStoreProductsService,
    private _categories: GdevStoreCategoriesService,
    private _dialog: MatDialog,
    public _index: GdevIndexService
  ) {
    this.prodSelected = new GdevStoreProductModel('',0,false,0,'','',[], [], [], [], this.preDesc, '')
    this._collapsitable.tableFieldsPath = 'tienda/productos/categorias/motos nuevas'
    this._collapsitable.columns = this.columns
    this._collapsitable.options = { delete: true, edit: true, go: true }
    this._collapsitable.objectKeys = { id: 'id', imageUrl: 'imagenUrl' }
  }
  
  ngOnInit() {
    this.loadProducts()
    this.loadCategories()
    this.onEdit()
    this.onDel()
    this.onDelAttr()
    this.onGo()
  }



  async reloadProducts() {
    this.products = []
    console.log(this.products);
    this.loadProducts()
  }

  async loadCategories() {
    var categories = await this._categories.loadCategories()
    categories.forEach( category => {
      this.categories.push(category.name)
    })
  }

  

  async loadProducts() {
    this._index.initIndex( 'tienda/productos/referencias', 'id', 20 )
    this._index.queryData.subscribe( data => {
      this.products = data
      // this.products = data as GdevStoreProductModel[]
      // this._collapsitable.items = this.products
      console.log( this.products );
    } )
    this._index.loadingQuery.subscribe( resp => {
      if ( resp ) {
        this.products = []
        this._collapsitable.items = []
      } 
    } )
    return
  }

  onProdSelected( selected: MatSelectionListChange ) {
    if ( this.productPanel.opened ) { this.productPanel.close() }
    this.prodSelected = selected.option.value
    console.log(this.prodSelected);
    this.productPanel.open()
  }

  onClosePanel() {
    this.productPanel.close()
    this.listPanel.deselectAll()
    this.prodSelected = new GdevStoreProductModel( '', 0, false, 0, '', '', [], [], [], [], this.preDesc, '' )
  }

  onEdit() {
    this._collapsitable.onEdit.subscribe( productId => {
      this.router.navigate(['/panel/store/products/edit/', productId])
    } )
  }

  onGo() {
    this._collapsitable.onGo.subscribe( productId => {
      
      window.open( '//'+ `www.tiendalasmotos.com/tienda/producto/${ productId }`)
    } )
  }

  onDel() {
    this._collapsitable.onDelete.subscribe( productId => {
      var dialog = this._dialog.open( DelProdcutComponent, {
        maxWidth: '90vw',
        minWidth: '450px',
        data: productId
      } )

      dialog.afterClosed().subscribe( () => {
        console.log('closed');
        this.reloadProducts()
      })
      
    } )
    
  }

  onDelAttr() {
    this._collapsitable.onDeleteAttr.subscribe( itemAttr => {
      console.log(itemAttr);
      this._products.onDelAttr( itemAttr )
    } )
  }

}
