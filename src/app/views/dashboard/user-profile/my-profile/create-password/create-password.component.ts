import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { UserProfileProcessService } from "src/app/services/app-state/user-profile-process.service";
import { AuthenticateService, UserService } from "src/app/services";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PASSWORD_DONT_MATCH_ERROR } from "src/app/shared/config";
import { first } from "rxjs/operators";
import { Input } from "@angular/compiler/src/core";
import { ValiDatePassword } from "src/app/models/validate.model";

@Component({
  selector: "app-create-password",
  templateUrl: "./create-password.component.html",
  styleUrls: ["./create-password.component.scss"]
})
export class CreatePasswordComponent implements OnInit {
  rForm: FormGroup;
  notShowing = true;
  error = "";
  currentUser: User;
  validations;
  validator = new ValiDatePassword("");
  constructor(
    private fb: FormBuilder,
    private userProfileProcess: UserProfileProcessService,
    private authenticateService: AuthenticateService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.validations = this.validator.validate();
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      OldPassword: ["Nan"],
      Password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    });

    // get current user
    const user = this.authenticateService.currentUserValue;

    this.authenticateService
      .getFullClientDetails(user.UserId)
      .subscribe(response => {
        if (response.UserId) {
          this.currentUser = response;
        }
      });

    this.rForm.valueChanges.subscribe(data => {
      this.validator = new ValiDatePassword(data.Password || "");
      console.log(data);
      this.validations = this.validator.validate();
    });
  }

  get formValues() {
    return this.rForm.controls;
  }

  updatePassword() {
    this.error = "";
    if (
      !this.validations.LENGHT.pass ||
      !this.validations.LOWER.pass ||
      !this.validations.UPPER.pass ||
      !this.validations.DIGITS.pass ||
      !this.validations.SPECIAL.pass
    ) {
      this.messageService.add({
        life: 7000,
        severity: "warn",
        summary: "Opps!",
        detail: "Sorry password requirements are not met."
      });
      return false;
    }
    if (
      this.formValues.Password.value !== this.formValues.confirmPassword.value
    ) {
      this.messageService.add({
        life: 7000,
        severity: "warn",
        summary: "Opps!",
        detail: PASSWORD_DONT_MATCH_ERROR
      });
      return false;
    }
    this.currentUser.Password = this.formValues.Password.value;
    this.userService.verifyUser(this.currentUser).subscribe(Response => {
      if (Response) {
        // lOGIN USER
        this.authenticateService
          .loginUser(this.currentUser.Email, this.currentUser.Password)
          .pipe(first())
          .subscribe(response => {
            if (response) {
              this.userProfileProcess.updateUserProfileProcessState({
                resetPasswordMessage: "reset your password."
              });
              this.messageService.add({
                life: 3000,
                severity: "success",
                summary: "Welcome TO Citgo!",
                detail: "Your Password has been create!"
              });
              this.messageService.add({
                life: 12000,
                severity: "info",
                summary: "Buy Citgo shares!",
                detail:
                  "Now you can buy your first share by clicking buy shares button below!"
              });
              this.router.navigate(["/dashboard"]);
            } else {
              this.error = response;
            }
          });
      }
    });
  }
  show() {
    let inputpass = document.getElementById("pass");
    let inputpasscon = document.getElementById("inputpasscon");

    if(this.notShowing){
      this.notShowing = false;
      inputpass.attributes["type"].value = "text";
      inputpasscon.attributes["type"].value = "text";

    }else{
      this.notShowing = true;
      inputpass.attributes["type"].value = "password";
      inputpasscon.attributes["type"].value = "password";
    }

  }
}

