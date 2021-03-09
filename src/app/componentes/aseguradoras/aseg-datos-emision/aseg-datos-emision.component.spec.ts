import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsegDatosEmisionComponent } from './aseg-datos-emision.component';

describe('AsegDatosEmisionComponent', () => {
  let component: AsegDatosEmisionComponent;
  let fixture: ComponentFixture<AsegDatosEmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsegDatosEmisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsegDatosEmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
