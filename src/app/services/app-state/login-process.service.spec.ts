/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginProcessService } from './login-process.service';

describe('Service: LoginProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginProcessService]
    });
  });

  it('should ...', inject([LoginProcessService], (service: LoginProcessService) => {
    expect(service).toBeTruthy();
  }));
});
