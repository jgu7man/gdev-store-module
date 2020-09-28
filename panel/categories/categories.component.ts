import { Component, OnInit } from '@angular/core';
import { GdevStoreCategoryModel } from './category.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevStoreCategoriesService } from './categories.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { Loading } from '../../../Gdev-Tools/loading/loading.service';

@Component({
  selector: 'gdev-store-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public forms: boolean = false
  public add: boolean = false
  public edit: boolean = false
  public del: boolean = false
  public attr: boolean = false
  public categories: GdevStoreCategoryModel[]
  public idSelect: string
  constructor (
    private _categories: GdevStoreCategoriesService,
    private _loading: Loading,
    private _title: Title,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this._title.setTitle( 'Panel - Tienda - Categorias' )
  }

  async ngOnInit() {
    this._loading.turnOn()
    this.categories = await this._categories.loadCategories()
    this.fixOnScroll()
    this._loading.turnOff( 'slide-up' )
  }

 
  fixOnScroll() {
    // if (window.scrollY >= 295) {
    $( '#table-body' ).css( {
      'overflow': 'auto',
      'height': '90vh'
    } )
    // }
  }

  async ngOnChanges() {
    this.categories = await this._categories.loadCategories()
  }


  onSelect( id ) {
    this.idSelect = id
  }

  onAdd() {
    var dialog = this._dialog.open( AddCategoryComponent, {
      maxWidth: '90vw',
      minWidth: '450px'
    } )
    
    dialog.afterClosed().subscribe( () => {
      this.router.navigateByUrl( 'panel', { skipLocationChange: true } )
      .then(()=> this.router.navigate(['panel/tienda/categories']))
    })
  }

  

}
