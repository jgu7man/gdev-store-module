import { Component, OnInit } from '@angular/core';
import { GdevResponsiveService } from '../../gdev-tools/commons/gdev-responsive.service';
import { SidenavNode } from '../../gdev-tools/sidenav/sidenav.interface';

@Component({
  selector: 'gdev-store-panel',
  templateUrl: './gdev-store-panel.component.html',
  styleUrls: ['./gdev-store-panel.component.scss']
})
export class GdevStoreComponent implements OnInit {

  constructor (
    public responsive: GdevResponsiveService
  ) { }

  ngOnInit() {
  }

  sidenavStructure: SidenavNode[] = [
    {
      name: 'Incio',
      route: 'inicio',
      routeId: 'inicio',
      childs: [
        {
          name: 'Contacto',
          route: 'contacto',
          routeId: 'contacto'
        },
        {
          name: 'Configuración',
          route: 'config',
          routeId: 'config'
        },
      ]
    },
    {
      name: 'Diseño',
      routeId: ['slider'],
      childs: [
        {
          name: 'Slider',
          route: 'slider'
        }
      ]
    },
    {
      name: 'Categorías',
      route: 'categories',
      routeId: 'categories',
      childs: [
        
      ]
    },
    {
      name: 'Productos',
      route: 'products',
      routeId: 'products',
      childs: [

      ]
    },
    {
      name: 'Pedidos',
      routeId: [ 'pendientes', 'enviados', 'entregados', 'cancelados' ],
      route: 'pedidos'
      // childs: [
      //   {
      //     name: 'pendientes',
      //     route: 'pendientes'
      //   },
      //   {
      //     name: 'enviados',
      //     route: 'enviados'
      //   },
      //   {
      //     name: 'entregados',
      //     route: 'entregados'
      //   },
      //   {
      //     name: 'cancelados',
      //     route: 'cancelados'
      //   },
      // ]
    },
    {
      name: 'Clientes',
      routeId: 'clientes',
      route: 'clientes',
      childs: [
        {
          name: 'Mensajes',
          route: 'mensajes',
          routeId: 'mensajes'
        }
      ]
    },
    {
      name: 'Admins',
      routeId: 'admins',
      route: 'admins'
    },
  ]
      
  

}
