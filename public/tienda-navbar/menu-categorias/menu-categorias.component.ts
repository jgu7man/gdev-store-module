import { Component, OnInit } from '@angular/core';
import { GdevStoreCategoriesService } from '../../../panel/categories/categories.service';
import { GdevStoreCategoryModel } from '../../../panel/categories/category.model';

@Component({
  selector: 'app-menu-categorias',
  templateUrl: './menu-categorias.component.html',
  styleUrls: ['./menu-categorias.component.css']
})
export class MenuCategoriasComponent implements OnInit {

  categorias: GdevStoreCategoryModel[] = []
  constructor (
    private _categories: GdevStoreCategoriesService
  ) { }

  async ngOnInit() {
    this.categorias = await this._categories.loadCategories()
  }

}
