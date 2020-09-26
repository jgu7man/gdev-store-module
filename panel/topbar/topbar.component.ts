import { Component, Input, OnInit } from '@angular/core';
import { NavbarMenuNode } from '../../../Gdev-Tools/navbar/navbar.component';
import { NavbarService } from '../../../Gdev-Tools/navbar/navbar.service';
import { AdminsService } from '../admin/admins.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    public navbarService: NavbarService,
    public router: Router
  ) { }

  async ngOnInit() {
    this.login.admin$.pipe(
      debounceTime(500)
    ).subscribe( admin => {
      if ( !admin ) {
        this.router.navigate(['/panel/login'])
      }
    })
  }
}


