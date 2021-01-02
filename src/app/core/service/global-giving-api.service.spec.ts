import { TestBed } from '@angular/core/testing';

import { GlobalGivingApiService } from './global-giving-api.service';

describe('GlobalGivingApiService', () => {
  let service: GlobalGivingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalGivingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
