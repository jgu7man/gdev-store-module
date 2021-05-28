import { GdevStoreCategoriesService } from './../categories/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GdevStoreProductModel, ProdDesc } from './product.model';
import { GdevIndexService } from 'src/app/gdev-tools/query-index/gdev-index.service';
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

  @ViewChild( 'currentProduct' ) productPanel: MatDrawer
  @ViewChild( 'listPanel' ) listPanel: MatSelectionList




  constructor (
    private _categories: GdevStoreCategoriesService,
    public index: GdevIndexService
  ) {

  }

  ngOnInit() {
    this.loadProducts()
    this.loadCategories()

  }



  async reloadProducts() {
    this.products = []
    console.log(this.products);
    this.loadProducts()
  }

  async loadCategories() {
    var categories = await this._categories.loadCategories()
    if ( categories ) {
      categories.forEach( category => {
        this.categories.push(category.name)
      })
    }
  }



  async loadProducts() {
    this.index.initIndex( 'tienda/productos/referencias', 'referencia', 20 )
    this.index.queryData.subscribe( data => {
      console.log( data )
      this.products = data
    } )
    this.index.loadingQuery.subscribe( resp => {
      if ( resp ) {
        this.products = []
      }
    } )
    return
  }

  onProdSelected( selected: MatSelectionListChange ) {
    if ( this.productPanel.opened ) { this.productPanel.close() }
    this.prodSelected = selected.option.value
    this.productPanel.open()
  }

  onClosePanel() {
    this.productPanel.close()
    this.listPanel.deselectAll()
    this.prodSelected = undefined
  }



}
