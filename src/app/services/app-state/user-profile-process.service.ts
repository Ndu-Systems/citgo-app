import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserprofileProcessModel, InitUserprofileProcessModel } from 'src/app/models/processes/userprofile.process.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileProcessService {


  UserProfileProcess = new BehaviorSubject<UserprofileProcessModel>(
    InitUserprofileProcessModel
  );
  castUserProfileProcess = this.UserProfileProcess.asObservable();
  constructor() { }

  getUserProfileProcess() { return this.UserProfileProcess.value; }

  updateUserProfileProcessState(data: UserprofileProcessModel) {
    this.UserProfileProcess.next(data);
  }

}

