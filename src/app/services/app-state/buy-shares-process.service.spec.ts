/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuySharesProcessService } from './buy-shares-process.service';

describe('Service: BuySharesProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuySharesProcessService]
    });
  });

  it('should ...', inject([BuySharesProcessService], (service: BuySharesProcessService) => {
    expect(service).toBeTruthy();
  }));
});
