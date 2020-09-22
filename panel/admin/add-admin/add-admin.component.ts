import { Component, OnInit } from '@angular/core';
import { AdminInterface, AdminRol } from '../admin.model';
import { AdminsService } from '../admins.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  admin: AdminInterface = {
    displayName:'', email: '', password:''
  }

  

  constructor (
    public adminS: AdminsService,
    public dialog: MatDialogRef<AddAdminComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.admin);
    this.adminS.createAdmin( this.admin ).then( () => {
      this.dialog.close()
    })
  }

}
