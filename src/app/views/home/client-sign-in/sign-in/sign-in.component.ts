import { SpinnerProcessService } from "./../../../../services/app-state/spinner-process.service";
import { MessageService } from "primeng/api";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";
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
import { REMBERPASSWORD } from "src/app/shared/config";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  rForm: FormGroup;
  loading = false;
  error = "";
  isLogin: boolean = true;

  email:string = "";
  password:string = ""
  savePassword:boolean = false;
  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private loginService: AuthenticateService,
    private loginProcess: LoginProcessService,
    private signUpProcessService: SignUpProcessService,
    private messageService: MessageService,
    private spinnerProcessService: SpinnerProcessService
  ) {
    let data =  localStorage.getItem(REMBERPASSWORD);
    if( data !== null && data !== "null"){
    this.email= JSON.parse(data).email;
    this.password = JSON.parse(data).password;
    this.savePassword = true;
    }
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      email: new FormControl(
       this.email,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: [this.password, Validators.required],
      savePassword: [this.savePassword, Validators.required],
    });
  }
  closeModal() {
    this.loginProcess.closeAll();
  }

  // convinient for easy form(rForm) data access
  get f() {
    return this.rForm.controls;
  }

  get formValues() {
    return this.rForm.controls;
  }
  Login() {
    // this.spinnerService.showSpinner();
    if(this.formValues.savePassword.value){
      localStorage.setItem(REMBERPASSWORD, JSON.stringify({email:this.formValues.email.value,password:this.formValues.password.value }))
    }else{
      localStorage.setItem(REMBERPASSWORD,null);
    }
    this.spinnerProcessService.showSpinner();
    this.loginService
      .loginUser(this.formValues.email.value, this.formValues.password.value)
      .pipe(first())
      .subscribe(
        response => {
          this.spinnerProcessService.closeSpinner();

          if (response.UserId) {
            this.routeTo.navigate(["/dashboard"]);
          } else {
            // this.error = response;
            this.messageService.add({
              life: 7000,
              severity: "warn",
              summary: "access denied!",
              detail:
                "Please make sure you enter your email address and password correctly"
            });
          }
        },
        error => {
          this.messageService.add({
            life: 12000,
            severity: "error",
            summary: "Newtork error occured!",
            detail: error
          });
          this.spinnerProcessService.closeSpinner();
        }
      );
  }

  resetPassword() {
    this.loginProcess.showChangePass();
  }
  createAccount() {
    this.loginProcess.closeAll();
    this.signUpProcessService.showPersonalInfoForm();
  }
}
