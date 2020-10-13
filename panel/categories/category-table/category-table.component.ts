import { Component, OnInit, Input} from '@angular/core';
import { GdevStoreCategoryModel } from '../category.model';
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
