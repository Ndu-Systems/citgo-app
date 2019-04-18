/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BeneficiariesService } from './beneficiaries.service';

describe('Service: Beneficiaries', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeneficiariesService]
    });
  });

  it('should ...', inject([BeneficiariesService], (service: BeneficiariesService) => {
    expect(service).toBeTruthy();
  }));
});
