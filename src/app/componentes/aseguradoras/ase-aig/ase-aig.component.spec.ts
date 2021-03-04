import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseAIGComponent } from './ase-aig.component';

describe('AseAIGComponent', () => {
  let component: AseAIGComponent;
  let fixture: ComponentFixture<AseAIGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseAIGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseAIGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
