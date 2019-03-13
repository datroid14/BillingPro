import { TestBed, inject } from '@angular/core/testing';

import { ExcelService } from './excel.service';

describe('Excel.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelService]
    });
  });

  it('should be created', inject([ExcelService], (service: ExcelService) => {
    expect(service).toBeTruthy();
  }));
});
