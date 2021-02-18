import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseAXXAComponent } from './ase-axxa.component';

describe('AseAXXAComponent', () => {
  let component: AseAXXAComponent;
  let fixture: ComponentFixture<AseAXXAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseAXXAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseAXXAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
