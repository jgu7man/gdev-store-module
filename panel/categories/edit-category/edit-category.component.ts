import { Component, OnInit, Input, Inject } from '@angular/core';
import { GdevStoreCategoryModel } from '../category.model';
import { GdevStoreCategoriesService } from '../categories.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from '../../../../gdev-tools/alerts/alert.service';

@Component({
  selector: 'gdev-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() path: string
  public category: GdevStoreCategoryModel
  constructor (
    private _category: GdevStoreCategoriesService,
    private _dialog: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private categoryId: string,
    private _alerta: AlertService,
    private _router: Router
  ) {
    this.category = new GdevStoreCategoryModel( '', [], 'tienda/productos/categorias' )
  }

  ngOnInit() {
    this.category.name = this.categoryId
    console.log(this.category);
  }

  onSubmit() {
    this._category.editCategory( this.category, this.categoryId )
      .then( () => {
        console.log( 'listo' );
        this._dialog.close()
        this._router.navigateByUrl( 'panel' ).then( () => {
          this._router.navigate( [ 'panel/tienda/categories' ] )
        } )
      } )
      .catch( error => { this._alerta.sendMessageAlert( 'Oops! Algo salió mal' ) } )
  }

}
