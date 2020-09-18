import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ClienteLoginService } from '../../clientes/clientes-login/cliente-login.service';
import { MobileNavbarService } from '../mobile-navbar.service';
import { GdevStoreCategoryModel } from '../../../panel/categories/category.model';
import { GdevStoreCategoriesService } from '../../../panel/categories/categories.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {

  categorias: GdevStoreCategoryModel[] = []

  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter()
  constructor(
    public auth: ClienteLoginService,
    public location: Location,
    public _navbar: MobileNavbarService,
    private _categories: GdevStoreCategoriesService
  ) {
   }

  async ngOnInit() {
    let path = this.location.path().split('/')
    $("#"+path[2]).attr('aria-expanded', 'true')
    this.categorias = await this._categories.loadCategories()
  }

  onActive(path) {
    return this.location.path().includes(path)
  }


  

}
