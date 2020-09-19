import { Component, Input, OnInit } from '@angular/core';
import { NavbarMenuNode } from '../../../Gdev-Tools/navbar/navbar.component';
import { NavbarService } from '../../../Gdev-Tools/navbar/navbar.service';
import { AdminsService } from '../admin/admins.service';

@Component({
  selector: 'gdev-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() appTitle: string = 'Gdev Store'
  @Input() menuStructure: NavbarMenuNode[]

  constructor (
    public login: AdminsService,
    public navbarService: NavbarService
  ) { }

  async ngOnInit() {
    this.login.$admin.subscribe(admin => console.log(admin))
  }
}


