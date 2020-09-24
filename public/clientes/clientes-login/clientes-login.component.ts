import { Component, OnInit } from '@angular/core';
import { ClienteLoginService } from './cliente-login.service';
import { ClienteModel } from '../cliente.model';
import { GdevLoginFields } from '../../../../Gdev-Tools/gdev-login/components/login-card/login-card.component';

@Component({
  templateUrl: './clientes-login.component.html',
  styleUrls: ['./clientes-login.component.scss']
})
export class ClientesLoginComponent implements OnInit {

  cliente: ClienteModel
  constructor (
    public login: ClienteLoginService
  ) {
    this.cliente = new ClienteModel('','')
   }

  ngOnInit(): void {
  }

  onSubmit(fields: GdevLoginFields) {
    this.login.emailSingIn(fields.email, fields.password)
  }

}
