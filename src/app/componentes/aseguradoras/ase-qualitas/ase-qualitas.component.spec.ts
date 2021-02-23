import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseQUALITASComponent } from './ase-qualitas.component';

describe('AseQUALITASComponent', () => {
  let component: AseQUALITASComponent;
  let fixture: ComponentFixture<AseQUALITASComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseQUALITASComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseQUALITASComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
