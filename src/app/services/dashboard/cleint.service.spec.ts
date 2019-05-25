/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CleintService } from './cleint.service';

describe('Service: Cleint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CleintService]
    });
  });

  it('should ...', inject([CleintService], (service: CleintService) => {
    expect(service).toBeTruthy();
  }));
});
