import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  private _gallery = new BehaviorSubject<{}>( {} )
  @Input() set gallery( object: {} ) { this._gallery.next( object ) }
  get gallery() { return this._gallery.getValue() }

  constructor() { }


  ngOnInit() {
    this._gallery.subscribe( async gallery => { 
      this.gallery = gallery
    }) 
  }

}
