import { TestBed, inject } from '@angular/core/testing';

import { InsuranceService } from './insurance.service';

describe('InsuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceService]
    });
  });

  it('should be created', inject([InsuranceService], (service: InsuranceService) => {
    expect(service).toBeTruthy();
  }));
});
