import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileNavbarService } from '../tienda-navbar/mobile-navbar.service';
import { GdevCommonsService } from '../../../Gdev-Tools/commons/gdev-commons.service';
import { GdevStorePublicService } from '../gdev-store-public.service';

@Component({
  selector: 'app-aparador',
  templateUrl: './aparador.component.html',
  styleUrls: [ './aparador.component.css' ],
})
export class AparadorComponent implements OnInit {

  products: any[]

  constructor (
    private _tienda: GdevStorePublicService,
    private route: ActivatedRoute,
    private router: Router,
    private _commons: GdevCommonsService,
    private navbar: MobileNavbarService
  ) {
    
  }
  
  async ngOnInit() {
   
  }





  



}
