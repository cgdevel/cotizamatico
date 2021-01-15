import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfovehiculoComponent } from './infovehiculo.component';

describe('InfovehiculoComponent', () => {
  let component: InfovehiculoComponent;
  let fixture: ComponentFixture<InfovehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfovehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfovehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
