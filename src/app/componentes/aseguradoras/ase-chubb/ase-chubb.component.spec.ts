import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseCHUBBComponent } from './ase-chubb.component';

describe('AseCHUBBComponent', () => {
  let component: AseCHUBBComponent;
  let fixture: ComponentFixture<AseCHUBBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseCHUBBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseCHUBBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
