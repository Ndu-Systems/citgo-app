import { Component, OnInit } from '@angular/core';
import { UserProfileProcessService } from 'src/app/services/app-state/user-profile-process.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  heading = "update password";
  constructor(
    private userProfileProcess: UserProfileProcessService
  ) { }

  ngOnInit() {
    debugger
    this.userProfileProcess.castUserProfileProcess.subscribe(process => {
      if (process.resetPasswordMessage != null)
        this.heading = process.resetPasswordMessage;
    });
  }

}
