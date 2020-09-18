import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aparador-scroll-thumbnail',
  templateUrl: './aparador-scroll-thumbnail.component.html',
  styleUrls: ['./aparador-scroll-thumbnail.component.scss']
})
export class AparadorScrollThumbnailComponent implements OnInit {

  @Input() products: any[]
  @Input() productIndex: number
  @Output() updateProduct: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  scrollMinLeft() {
    var minis = document.getElementById( 'miniaturas' )
    var scrollAmount = 0
    var slideTimer = setInterval( () => {
      minis.scrollLeft -= 15
      scrollAmount += 15
      if ( scrollAmount >= 150 ) {
        window.clearInterval( slideTimer );
      }
    }, 15 )
  }

  checkScrollLeft() {
    var minis = document.getElementById( 'miniaturas' )
    var scrollLeft = minis.scrollLeft
    var valid = scrollLeft <= 0 ? false : true
    return valid
  }

  scrollMinRight() {
    var minis = document.getElementById( 'miniaturas' )
    var scrollAmount = 0
    var slideTimer = setInterval( () => {
      minis.scrollLeft += 15
      scrollAmount += 15
      if ( scrollAmount >= 150 ) {
        window.clearInterval( slideTimer );
      }
    }, 15 )
  }

  checkScrollRight() {
    var minis = document.getElementById( 'miniaturas' )
    var index = document.getElementById( 'index' )
    var scrollMinis = minis.scrollWidth
    var scrollIndex = index.scrollWidth
    var diff = scrollMinis - scrollIndex
    var scrollLeft = minis.scrollLeft
    var valid = scrollLeft >= diff ? false : true
    return valid
  }

}
