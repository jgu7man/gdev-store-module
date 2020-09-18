import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { GdevStorePublicService } from '../../gdev-store-public.service';

@Component({
  selector: 'app-aparador-slider',
  templateUrl: './aparador-slider.component.html',
  styleUrls: ['./aparador-slider.component.css']
})
export class AparadorSliderComponent implements OnInit {

  
  @Input() moto
  constructor(private _tienda: GdevStorePublicService) {

   }
  

  ngOnInit() {
    
  }


}
