import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService, UserService } from 'src/app/services';
import { MessageService } from 'primeng/api';
import { STATUS_USER_NEW, STATUS_USER_ACTIVE, DEFAULT_PASSWORD } from 'src/app/shared/config';
import { first } from 'rxjs/operators';
import { UserProfileProcessService } from 'src/app/services/app-state/user-profile-process.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userId: string;
  currentUser: User;
  progress: string = "Verifying your account....";
  Error: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authicateService: AuthenticateService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private userProfileProcess: UserProfileProcessService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r['id'];
    });
  }

  ngOnInit() {
    this.authicateService.getFullClientDetails(this.userId).subscribe(r => {
      if (r == null) {
        return false;
      }
      this.currentUser = r;
      if (Number(this.currentUser.StatusId) == STATUS_USER_ACTIVE) {      
        this.currentUser.ModifyUserId = this.userId;
        this.currentUser.Password = DEFAULT_PASSWORD;
        this.userService.verifyUser(this.currentUser).subscribe(res => {
          // lOGIN USER
          this.authicateService
            .loginUser(this.currentUser.Email, this.currentUser.Password)
            .pipe(first())
            .subscribe(response => {
              if (response) {
               
                // setTimeout(function() {
                //   this.popMessage(
                //     "success",
                //     "Account verified",
                //     `Your account was verified successfully`
                //   );

                // }, 3000);
                this.userProfileProcess.updateUserProfileProcessState({resetPasswordMessage: "reset your password."})
                this.router.navigate(["/dashboard"]);


              } else {
                alert("Error");
              }
            });
        });
      } else {
        this.Error = "This activation link  have already been used";
        this.progress = "";
      }
    });
  }
  popMessage(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

}
