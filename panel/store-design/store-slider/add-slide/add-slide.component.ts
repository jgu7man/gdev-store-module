import { Component, OnInit } from '@angular/core';
import { Slide, Enlace, GdevSliderService } from '../../../../../Gdev-Tools/gdev-slider/gdev-slider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { imageElement } from '../../../../../Gdev-Tools/advance-fields/components/image-uploader/image-preview/image-preview.component';

@Component({
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.scss']
})
export class AddSlideComponent implements OnInit {

  enlace: Enlace = {url: '', newTab: false}
  slide: Slide = {
    nombre: '', image: '', enlace: this.enlace,  activado: true
  }

  uploader

  

  constructor (
    public dialog: MatDialogRef<AddSlideComponent>,
    private _slides: GdevSliderService
  ) { 
    // this.uploader = new FileImageInputModel(
    //   'Subir imagen', 'upload-image', true, 'Cargar'
    // )
  }

  ngOnInit(): void {

  }

  onActivadoChange(event: MatSlideToggleChange) {
    this.slide.activado = event.checked
  }

  onNewtabChange( event: MatCheckboxChange ) {
    this.enlace.newTab = event.checked
  }

  catchImageURL(image: imageElement) {
    this.slide.image = image.url
  }

  addSlide() {
    this.slide.enlace = this.enlace
    this._slides.addSlide( this.slide, 'tienda' )
    .then(() => this.dialog.close())
  }

}
