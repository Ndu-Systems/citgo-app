import { UserRole } from "src/app/models/userole.model";
import { User } from "src/app/models/user";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  STATUS_USER_NEW,
  STATUS_USER_ACTIVE,
  CLIENT_USER_ROLE
} from "src/app/shared/config";
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
  isDone: boolean;
  progress: string = "Verifying your account....";
  linkedUsed: boolean;
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
        this.userService.verifyUser(this.currentUser).subscribe(res => {
          let role: UserRole = {
            UserId: this.currentUser.UserId,
            RoleId: CLIENT_USER_ROLE,
            CreateUserId: this.currentUser.UserId,
            ModifyUserId: this.currentUser.UserId,
            StatusId: 1
          };
          this.userService.addUserRole(role).subscribe(role => {
            // lOGIN USER

            this.authicateService
              .loginUser(this.currentUser.Email, this.currentUser.Password)
              .pipe(first())
              .subscribe(response => {
                if (response) {
                  this.userProfileProcess.updateUserProfileProcessState({
                    resetPasswordMessage: "Create your new password."
                  });
                  this.isDone = true;
                } else {
                  alert("Error");
                }
              });
          });
        });
      } else {
        this.linkedUsed = true;
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
  updatePassword() {
    this.router.navigate(["/dashboard/create-password"]);
  }
}
