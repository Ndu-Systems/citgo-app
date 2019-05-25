/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserProfileProcessService } from './user-profile-process.service';

describe('Service: UserProfileProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfileProcessService]
    });
  });

  it('should ...', inject([UserProfileProcessService], (service: UserProfileProcessService) => {
    expect(service).toBeTruthy();
  }));
});
