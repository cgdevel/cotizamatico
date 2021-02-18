import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseBANORTEComponent } from './ase-banorte.component';

describe('AseBANORTEComponent', () => {
  let component: AseBANORTEComponent;
  let fixture: ComponentFixture<AseBANORTEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseBANORTEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseBANORTEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
