import { TestBed } from '@angular/core/testing';

import { InfovehiculoService } from './infovehiculo.service';

describe('InfovehiculoService', () => {
  let service: InfovehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfovehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
