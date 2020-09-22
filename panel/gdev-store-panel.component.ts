import { Component, OnInit } from '@angular/core';
import { GdevResponsiveService } from '../../Gdev-Tools/commons/gdev-responsive.service';
import { SidenavNode } from '../../Gdev-Tools/sidenav/sidenav.interface';

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
      routeId: 'pedidos',
    },
    {
      name: 'Admins',
      routeId: 'admins',
      route: 'admins'
    },
  ]
      
  

}
