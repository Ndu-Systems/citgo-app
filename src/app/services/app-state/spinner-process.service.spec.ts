/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpinnerProcessService } from './spinner-process.service';

describe('Service: SpinnerProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerProcessService]
    });
  });

  it('should ...', inject([SpinnerProcessService], (service: SpinnerProcessService) => {
    expect(service).toBeTruthy();
  }));
});
