import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Slide } from 'src/app/gdev-tools/gdev-slider/gdev-slider.service';
import { GdevSliderService, Enlace } from '../../../../../gdev-tools/gdev-slider/gdev-slider.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'gdev-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input() slide: Slide = { nombre: '', image: '', activado: true }
  enlace: Enlace = {url: '', newTab:false}
  @Output() close: EventEmitter<boolean> = new EventEmitter()

  constructor (
    private _slides: GdevSliderService
  ) { }

  ngOnInit(): void {
    if(this.slide.enlace) this.enlace = this.slide.enlace
  }

  onActivadoChange( event: MatSlideToggleChange ) {
    this.slide.activado = event.checked
  }

  onNewtabChange( event: MatCheckboxChange ) {
    this.enlace.newTab  = event.checked
  }

  onUpdate() {
    this.slide.enlace = this.enlace
    this._slides.updateSlide( this.slide )
  }

  onDelete() {
    this._slides.deleteSlide( this.slide )
    this.close.emit()
  }

}
