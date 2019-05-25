import { User } from "src/app/models/user";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { STATUS_USER_NEW, STATUS_USER_ACTIVE } from "src/app/shared/config";
import { first } from "rxjs/operators";
import { MessageService } from "primeng/api";
import { AuthenticateService } from "src/app/services/home/user/authenticate.service";
import { UserService } from "src/app/services";
import { UserProfileProcessService } from "src/app/services/app-state/user-profile-process.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"]
})
export class VerifyEmailComponent implements OnInit {
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
      this.userId = r["id"];
    });
  }

  ngOnInit() {
    this.authicateService.getFullClientDetails(this.userId).subscribe(r => {
      if (r == null) {
        return false;
      }
      this.currentUser = r;
      if (Number(this.currentUser.StatusId) == STATUS_USER_NEW) {
        this.currentUser.StatusId = STATUS_USER_ACTIVE;
        this.currentUser.ModifyUserId = this.userId;
        this.userService.updateUser(this.currentUser).subscribe(res => {
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
                
                this.userProfileProcess.updateUserProfileProcessState({resetPasswordMessage: "Create your new password."})
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
