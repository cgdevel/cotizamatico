import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseAFIRMEComponent } from './ase-afirme.component';

describe('AseAFIRMEComponent', () => {
  let component: AseAFIRMEComponent;
  let fixture: ComponentFixture<AseAFIRMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseAFIRMEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseAFIRMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
