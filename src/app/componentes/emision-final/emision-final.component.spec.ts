import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionFinalComponent } from './emision-final.component';

describe('EmisionFinalComponent', () => {
  let component: EmisionFinalComponent;
  let fixture: ComponentFixture<EmisionFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmisionFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmisionFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
