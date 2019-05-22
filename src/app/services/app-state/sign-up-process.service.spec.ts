/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignUpProcessService } from './sign-up-process.service';

describe('Service: SignUpProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpProcessService]
    });
  });

  it('should ...', inject([SignUpProcessService], (service: SignUpProcessService) => {
    expect(service).toBeTruthy();
  }));
});
