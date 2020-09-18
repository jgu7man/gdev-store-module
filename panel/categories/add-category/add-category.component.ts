import { Component, OnInit, Input } from '@angular/core';
import { GdevStoreCategoryModel } from '../category.model';
import { GdevStoreCategoriesService } from '../categories.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/Gdev-Tools/alerts/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gdev-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Input() path: string
  public category: GdevStoreCategoryModel
  constructor (
    private _category: GdevStoreCategoriesService,
    private _dialog: MatDialogRef<AddCategoryComponent>,
    private _alerta: AlertService,
    private _router: Router
  ) {
    this.category = new GdevStoreCategoryModel('',[], 'tienda/productos/categorias')
   }

  ngOnInit() {
  }

  onSubmit() {
    this._category.addCategory( this.category )
      .then( () => {
        console.log('listo');
        this._dialog.close()
        this._router.navigateByUrl( 'panel/store' ).then( () => {
          this._router.navigate(['panel/store/categories'])
        })
      } )
      .catch( error => { this._alerta.sendMessageAlert( 'Oops! Algo salió mal' ) } )
  }

}
