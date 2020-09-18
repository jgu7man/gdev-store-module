import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteLoginService } from '../cliente-login.service';
import { Router } from '@angular/router';
import { ClienteModel } from '../../cliente.model';

@Component({
  templateUrl: './popup-login.component.html',
  styleUrls: ['./popup-login.component.scss']
})
export class PopupLoginComponent implements OnInit {

  tabIndex: number = 0

  constructor (
    public dialog: MatDialogRef<PopupLoginComponent>,
    @Inject( MAT_DIALOG_DATA ) public cliente: ClienteModel,
    public login: ClienteLoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegistered(event) {
    this.tabIndex = 0
  }

  onLogged(event) {
    this.dialog.close()
  }

  logGoogle() {
    this.login.googleSingIn().then( () => {
      this.dialog.close()
    })
  }

  logFacebook() {
    this.login.facebookSingIn().then( () => {
      this.dialog.close()
    } )
  }

}
