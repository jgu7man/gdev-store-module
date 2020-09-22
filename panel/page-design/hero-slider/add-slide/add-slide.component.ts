import { Component, OnInit } from '@angular/core';
import { Slide, Enlace, GdevSliderService } from '../../../../../Gdev-Tools/gdev-slider/gdev-slider.service';
import { FileImageInputModel } from '../../../../../Gdev-Tools/form-constructor/components/field-render/file-image/file-image-input.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { imageEl } from '../../../../../Gdev-Tools/advance-fields/components/file-uploader/file-uploader.component';

@Component({
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.scss']
})
export class AddSlideComponent implements OnInit {

  enlace: Enlace = {url: '', newTab: false}
  slide: Slide = {
    nombre: '', image: '', enlace: this.enlace,  activado: true
  }

  uploader: FileImageInputModel

  

  constructor (
    public dialog: MatDialogRef<AddSlideComponent>,
    private _slides: GdevSliderService
  ) { 
    this.uploader = new FileImageInputModel(
      'Subir imagen', 'upload-image', true, 'Cargar'
    )
  }

  ngOnInit(): void {

  }

  onActivadoChange(event: MatSlideToggleChange) {
    this.slide.activado = event.checked
  }

  onNewtabChange( event: MatCheckboxChange ) {
    this.enlace.newTab = event.checked
  }

  catchImageURL(image: imageEl) {
    this.slide.image = image.url
  }

  addSlide() {
    this.slide.enlace = this.enlace
    this._slides.addSlide( this.slide )
    .then(() => this.dialog.close())
  }

}
