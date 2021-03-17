import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmisionVehiculoComponent } from './datos-emision-vehiculo.component';

describe('DatosEmisionVehiculoComponent', () => {
  let component: DatosEmisionVehiculoComponent;
  let fixture: ComponentFixture<DatosEmisionVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEmisionVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmisionVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
