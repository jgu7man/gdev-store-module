import { Component, Input, OnInit } from '@angular/core';
import { ClienteModel } from '../../../public/clientes/cliente.model';

@Component({
  selector: 'gdev-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @Input() cliente: ClienteModel

  constructor() { }

  ngOnInit(): void {
  }

}
