/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientSignUpService } from './client-sign-up.service';

describe('Service: ClientSignUp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientSignUpService]
    });
  });

  it('should ...', inject([ClientSignUpService], (service: ClientSignUpService) => {
    expect(service).toBeTruthy();
  }));
});
