import { TestBed } from '@angular/core/testing';

import { ParamsInterceptor } from './params.interceptor';

describe('ParamsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ParamsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ParamsInterceptor = TestBed.inject(ParamsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
