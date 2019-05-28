/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NavigationProcessService } from './navigation-process.service';

describe('Service: NavigationProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationProcessService]
    });
  });

  it('should ...', inject([NavigationProcessService], (service: NavigationProcessService) => {
    expect(service).toBeTruthy();
  }));
});
