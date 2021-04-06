import { TestBed } from '@angular/core/testing';

import { SecureStorageServiceService } from './secure-storage-service.service';

describe('SecureStorageServiceService', () => {
  let service: SecureStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
