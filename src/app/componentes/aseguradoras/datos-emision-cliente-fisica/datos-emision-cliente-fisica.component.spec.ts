import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmisionClienteFisicaComponent } from './datos-emision-cliente.component';

describe('DatosEmisionClienteComponent', () => {
  let component: DatosEmisionClienteFisicaComponent;
  let fixture: ComponentFixture<DatosEmisionClienteFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEmisionClienteFisicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmisionClienteFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
