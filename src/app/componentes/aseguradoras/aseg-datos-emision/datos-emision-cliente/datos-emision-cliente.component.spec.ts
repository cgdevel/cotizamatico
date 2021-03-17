import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmisionClienteComponent } from './datos-emision-cliente.component';

describe('DatosEmisionClienteComponent', () => {
  let component: DatosEmisionClienteComponent;
  let fixture: ComponentFixture<DatosEmisionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEmisionClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmisionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
