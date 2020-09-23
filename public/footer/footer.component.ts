import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";

@Component({
  selector: 'gdev-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  getIn: boolean

  constructor() { }

  ngOnInit(): void {
    timer( 2000 ).subscribe( ready => {
      this.getIn = true
    })
  }

}
