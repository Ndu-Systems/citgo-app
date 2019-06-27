/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WithdrawalService } from './withdrawal.service';

describe('Service: Withdrawal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WithdrawalService]
    });
  });

  it('should ...', inject([WithdrawalService], (service: WithdrawalService) => {
    expect(service).toBeTruthy();
  }));
});
