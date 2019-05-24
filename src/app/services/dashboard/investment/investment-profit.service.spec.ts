/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvestmentProfitService } from './investment-profit.service';

describe('Service: InvestmentProfit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestmentProfitService]
    });
  });

  it('should ...', inject([InvestmentProfitService], (service: InvestmentProfitService) => {
    expect(service).toBeTruthy();
  }));
});
