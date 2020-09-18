import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparadorPromoComponent } from './aparador-promo.component';

describe('AparadorPromoComponent', () => {
  let component: AparadorPromoComponent;
  let fixture: ComponentFixture<AparadorPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparadorPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparadorPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
