import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { LoginProcessService } from "src/app/services/app-state/login-process.service";
import { AuthenticateService } from "src/app/services/home/user/authenticate.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  rForm: FormGroup;
  loading = false;
  error = '';
  isLogin: boolean = true;
  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private loginService: AuthenticateService,
    private loginProcess: LoginProcessService
  ) {

  }

  ngOnInit() {
    this.rForm = this.fb.group({
      email: new FormControl(
        "youremail@example.com",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: ["pass@123!", Validators.required]
    });
  }
  closeModal() {
    this.loginProcess.closeAll();
  }

  // convinient for easy form(rForm) data access
  get f() {
    return this.rForm.controls;
  }

  signIn() {
    this.loading = true;
    this.routeTo.navigate(['dashboard']);
  }
  get formValues() {
    return this.rForm.controls;
  }
  Login() {
    // this.spinnerService.showSpinner();

    this.loginService
      .loginUser(this.formValues.email.value, this.formValues.password.value)
      .pipe(first())
      .subscribe(response => {
        if (response) {
          // this.router.navigate(["/dashboard"]);
          this.routeTo.navigate(['/dashboard']);
          // this.spinnerService.hideSpinner();
        } else {
          this.error = response;
        }
      });
  }

  resetPassword() {
    this.loginProcess.showChangePass();
  }
}
