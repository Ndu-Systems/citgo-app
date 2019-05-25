/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationProcessService } from './notification-process.service';

describe('Service: NotificationProcess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationProcessService]
    });
  });

  it('should ...', inject([NotificationProcessService], (service: NotificationProcessService) => {
    expect(service).toBeTruthy();
  }));
});
