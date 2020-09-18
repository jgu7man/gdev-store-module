import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparadorMasVistosComponent } from './aparador-mas-vistos.component';

describe('AparadorMasVistosComponent', () => {
  let component: AparadorMasVistosComponent;
  let fixture: ComponentFixture<AparadorMasVistosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparadorMasVistosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparadorMasVistosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
