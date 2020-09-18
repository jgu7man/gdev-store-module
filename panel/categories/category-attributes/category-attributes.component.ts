import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormConstructorService } from '../../../../Gdev-Tools/form-constructor/form-constructor.service';

@Component({
  selector: 'gdev-category-attributes',
  templateUrl: './category-attributes.component.html',
  styleUrls: ['./category-attributes.component.css']
})
export class GdevCategoryAttributesComponent implements OnInit {


  categoryId: string
  @Output() closeForm: EventEmitter<any> = new EventEmitter()
  constructor(
    private _formConst: FormConstructorService,
    private router: Router,
    public location: Location,
    private _url: ActivatedRoute
  ) {
    this.categoryId = this._url.snapshot.params['id']
   }

  ngOnInit() {
    this._formConst.complete.subscribe(res => {
      if (res) {
        $("#motosTable").toggleClass('hide')
        this.closeForm.emit(false)
        this.router.navigateByUrl('/panel/store', { skipLocationChange: true })
          .then(() => {this.router.navigate(['/panel/store/categories'])}); 
      }
    })
  }

}
