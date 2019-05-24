/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BankingInfoService } from './bankingInfo.service';

describe('Service: BankingInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankingInfoService]
    });
  });

  it('should ...', inject([BankingInfoService], (service: BankingInfoService) => {
    expect(service).toBeTruthy();
  }));
});
