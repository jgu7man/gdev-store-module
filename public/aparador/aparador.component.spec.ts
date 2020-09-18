import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparadorComponent } from './aparador.component';

describe('AparadorComponent', () => {
  let component: AparadorComponent;
  let fixture: ComponentFixture<AparadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
