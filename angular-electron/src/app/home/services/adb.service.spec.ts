import { TestBed } from '@angular/core/testing';

import { AdbService } from './adb.service';

describe('AdbService', () => {
  let service: AdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
