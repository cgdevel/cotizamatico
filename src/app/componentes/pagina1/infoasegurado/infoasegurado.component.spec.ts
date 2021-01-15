import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoaseguradoComponent } from './infoasegurado.component';

describe('InfoaseguradoComponent', () => {
  let component: InfoaseguradoComponent;
  let fixture: ComponentFixture<InfoaseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoaseguradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoaseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
