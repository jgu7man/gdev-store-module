import { Component, OnInit } from '@angular/core';
import { ClienteLoginService } from './cliente-login.service';
import { ClienteModel } from '../cliente.model';

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

  onSubmit() {
    
  }

}
