import { TestBed } from '@angular/core/testing';

import { MesesConDiasService } from './meses-con-dias.service';

describe('MesesConDiasService', () => {
  let service: MesesConDiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesesConDiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
