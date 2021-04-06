import { Injectable } from '@angular/core';
import { StorageServiceService } from '../core/storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageServiceService {
  constructor(private storageService: StorageServiceService) {}

  setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }
}
