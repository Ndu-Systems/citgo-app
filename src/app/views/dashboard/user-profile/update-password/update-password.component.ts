import { Component, OnInit } from "@angular/core";
import { UserProfileProcessService } from "src/app/services/app-state/user-profile-process.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import {
  PASSWORD_DONT_MATCH_ERROR,
  OLD_PASSWORD_DONT_MATCH_ERROR
} from "src/app/shared/config";
import { User } from "src/app/models/user";
import { AuthenticateService, UserService } from "src/app/services";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ValiDatePassword } from "src/app/models/validate.model";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"]
})
export class UpdatePasswordComponent implements OnInit {
  rForm: FormGroup;
  loading = false;
  error = "";
  currentUser: User;
  heading;
  validations;
  validator = new ValiDatePassword("");
  notShowing: boolean =true;
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
    this.userProfileProcess.castUserProfileProcess.subscribe(process => {
      if (process.resetPasswordMessage != null) {
        this.heading = process.resetPasswordMessage || "Update Your password";
      }
    });
    this.rForm = this.fb.group({
      OldPassword: [null, Validators.required],
      Password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    });

    this.rForm.valueChanges.subscribe(data => {
      this.validator = new ValiDatePassword(data.Password || "");
      console.log(data);
      this.validations = this.validator.validate();
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
  }

  get formValues() {
    return this.rForm.controls;
  }

  updatePassword() {
    this.error = "";
    if (this.formValues.OldPassword.value !== this.currentUser.Password) {
      this.messageService.add({
        life: 7000,
        severity: "warn",
        summary: "Opps!",
        detail: OLD_PASSWORD_DONT_MATCH_ERROR
      });
      return false;
    }
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
                life: 7000,
                severity: "success",
                summary: "Welcome back!",
                detail: "Your Password has been changed!"
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
