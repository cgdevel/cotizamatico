import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseANNAComponent } from './ase-anna.component';

describe('AseANNAComponent', () => {
  let component: AseANNAComponent;
  let fixture: ComponentFixture<AseANNAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseANNAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseANNAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
