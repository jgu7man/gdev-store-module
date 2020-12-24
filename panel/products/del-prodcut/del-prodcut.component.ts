import { Component, OnInit, Inject } from '@angular/core';
import { GdevStoreProductModel } from '../product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GdevStoreProductsService } from '../products.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../gdev-tools/alerts/alert.service';

@Component({
  templateUrl: './del-prodcut.component.html',
  styleUrls: ['./del-prodcut.component.scss']
})
export class DelProdcutComponent implements OnInit {

  product: GdevStoreProductModel
  constructor (
    private _dialog: MatDialogRef<DelProdcutComponent>,
    @Inject( MAT_DIALOG_DATA ) private productId: string,
    private _products: GdevStoreProductsService,
    private _router: Router,
    private _alerta: AlertService
  ) {
    this.product = new GdevStoreProductModel( '',  0, true, '', {},'',[],[] )
  }

  ngOnInit() {
  }

  onDelete() {
    this._products.delProduct( this.productId )
      .then( () => {
        console.log( 'listo' );
        this._dialog.close()
      } )
      .catch( error => {
        this._dialog.close()
        this._alerta.sendMessageAlert( 'Oops! Algo salió mal: '+error )
      } )
  }

}
