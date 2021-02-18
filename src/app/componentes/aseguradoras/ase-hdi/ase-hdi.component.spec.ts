import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseHDIComponent } from './ase-hdi.component';

describe('AseHDIComponent', () => {
  let component: AseHDIComponent;
  let fixture: ComponentFixture<AseHDIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseHDIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseHDIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
