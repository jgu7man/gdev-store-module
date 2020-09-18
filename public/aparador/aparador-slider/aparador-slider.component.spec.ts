import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparadorSliderComponent } from './aparador-slider.component';

describe('AparadorSliderComponent', () => {
  let component: AparadorSliderComponent;
  let fixture: ComponentFixture<AparadorSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparadorSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparadorSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
