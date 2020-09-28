import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { GdevSliderService } from 'src/app/Gdev-Tools/gdev-slider/gdev-slider.service';
import { Slide } from 'src/app/Gdev-Tools/gdev-slider/gdev-slider.service';
import { AddSlideComponent } from './add-slide/add-slide.component';
import { MatDrawer } from '@angular/material/sidenav';
import { Enlace } from 'src/app/Gdev-Tools/gdev-slider/gdev-slider.service';

@Component({
  templateUrl: './store-slider.component.html',
  styleUrls: ['./store-slider.component.scss']
})
export class StoreSliderComponent implements OnInit {

  // slides: Slide[]
  tempEnlace: Enlace = {url: '', newTab: true}
  slideSelected: Slide = {nombre: '', image: '', activado: true, enlace: this.tempEnlace}
  @ViewChild( 'currentSlide' ) slidePanel: MatDrawer
  @ViewChild( 'listPanel' ) listPanel: MatSelectionList

  constructor (
    public dialog: MatDialog,
    public slidesS: GdevSliderService
  ) {
    this.slidesS.getSlidesList('tienda')
   }

  ngOnInit(): void {
    
  }

  // async getSlides() {
  //   this.slides = await this.slidesS.loadSlides()
  //   console.log( this.slides );
  // }

  openAddDialog() {
    var dialogRef =
    this.dialog.open( AddSlideComponent, {
      minWidth: '80%'
    } )
    // dialogRef.afterClosed().subscribe( () =>
    // {this.getSlides()})
  }

  onSlideSelected( selected: MatSelectionListChange ) {
    if ( this.slidePanel.opened ) { this.slidePanel.close() }
    this.slideSelected = selected.option.value
    this.slidePanel.open()
  }

  onCloseSlide() {
    this.slidePanel.close()
    this.listPanel.deselectAll()
    this.slideSelected = { nombre: '', image: '', activado: true, enlace: this.tempEnlace }
  }

  onDeleteSlide(slideId) {
    
  }

}
