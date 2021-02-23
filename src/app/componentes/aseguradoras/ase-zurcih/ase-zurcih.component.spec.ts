import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseZURCIHComponent } from './ase-zurcih.component';

describe('AseZURCIHComponent', () => {
  let component: AseZURCIHComponent;
  let fixture: ComponentFixture<AseZURCIHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseZURCIHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseZURCIHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
