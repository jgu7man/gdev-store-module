import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparadorProductosComponent } from './aparador-productos.component';

describe('AparadorProductosComponent', () => {
  let component: AparadorProductosComponent;
  let fixture: ComponentFixture<AparadorProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparadorProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparadorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
