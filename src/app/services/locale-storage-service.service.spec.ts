import { TestBed } from '@angular/core/testing';

import { LocaleStorageServiceService } from './locale-storage-service.service';

describe('LocaleStorageServiceService', () => {
  let service: LocaleStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaleStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
