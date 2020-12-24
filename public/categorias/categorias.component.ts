import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { GdevCommonsService } from 'src/app/gdev-tools/commons/gdev-commons.service';
import { GdevStoreCategoriesService } from '../../panel/categories/categories.service';
import { GdevStoreCategoryModel } from '../../panel/categories/category.model';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: [ './categorias.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class CategoriasComponent implements OnInit {

  categorias: GdevStoreCategoryModel[] = []
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private _title: Title,
    private _categorias: GdevStoreCategoriesService
  ) {
  }

  async ngOnInit() {
    this.categorias = await this._categorias.loadCategories()
  }

  

  

  

  

}
