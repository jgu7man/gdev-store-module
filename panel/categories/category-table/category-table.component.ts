import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollapsibleTableService, Column } from 'src/app/Gdev-Tools/collapsible-table/collapsible-table.service';
import { GdevStoreCategoryModel } from '../category.model';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { DelCategoryComponent } from '../del-category/del-category.component';

@Component({
  selector: 'gdev-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {

  @Input() categories: any[]
  categorySelected: GdevStoreCategoryModel
  displayedColumns: string[] = [ 'image', 'name', 'options' ];


  constructor (
    private _dialog: MatDialog
    ) {
    this.categorySelected = new GdevStoreCategoryModel('',[])
  }

  ngOnInit() {
    
  }

  ngOnChanges() {

  }

  onEdit(id) {
    this._dialog.open( EditCategoryComponent, {
      maxWidth: '90vw',
      minWidth: '450px',
      data: id
    } )
  }

  onDel(id) {
    this._dialog.open( DelCategoryComponent, {
      maxWidth: '90vw',
      minWidth: '450px',
      data: id
    } )
  }

  

}
