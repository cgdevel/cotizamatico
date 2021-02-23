import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseSURAComponent } from './ase-sura.component';

describe('AseSURAComponent', () => {
  let component: AseSURAComponent;
  let fixture: ComponentFixture<AseSURAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseSURAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseSURAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
