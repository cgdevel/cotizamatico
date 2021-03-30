import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEmisionClienteMoralComponent } from './datos-emision-cliente-moral.component';

describe('DatosEmisionClienteMoralComponent', () => {
  let component: DatosEmisionClienteMoralComponent;
  let fixture: ComponentFixture<DatosEmisionClienteMoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosEmisionClienteMoralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmisionClienteMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
