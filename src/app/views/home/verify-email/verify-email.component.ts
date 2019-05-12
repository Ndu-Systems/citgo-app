import { UserService } from './../services/user.service';
import { AuthenticateService } from "src/app/services";
import { User } from "src/app/models/user";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { STATUS_USER_NEW } from "src/app/shared/config";
import { first } from "rxjs/operators";

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
    private router: Router
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
      // if (Number(this.currentUser.StatusId) == STATUS_USER_NEW) {
      if (Number(this.currentUser.StatusId) == 1) {
        
        this.currentUser.StatusId = 3;
        this.userService.updateUser(this.currentUser).subscribe(res => {
          alert(JSON.stringify(res));
        });
        this.authicateService
          .loginUser(this.currentUser.Email, this.currentUser.Password)
          .pipe(first())
          .subscribe(response => {
            if (response) {
              this.router.navigate(["/dashboard"]);
            } else {
              alert("Error");
            }
          });
      } else {
        this.Error = "This activation link  have already been used";
        this.progress = "";
      }
    });
  }
}
