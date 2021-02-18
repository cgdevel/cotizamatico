import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseMAPFREComponent } from './ase-mapfre.component';

describe('AseMAPFREComponent', () => {
  let component: AseMAPFREComponent;
  let fixture: ComponentFixture<AseMAPFREComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseMAPFREComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseMAPFREComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
