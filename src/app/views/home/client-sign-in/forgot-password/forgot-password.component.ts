import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services';
import { LoginProcessService } from 'src/app/services/app-state/login-process.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  rForm: FormGroup;
  loading = false;
  error = '';
  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private loginService: AuthenticateService,
    private loginProcess: LoginProcessService
  ) {

  }
  ngOnInit() {
    this.rForm = this.fb.group({
      email: new FormControl('magwaza@mail.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }
  closeModal() {
    this.loginProcess.closeAll();
  }
  get formValues() {
    return this.rForm.controls;
  }

  forgotPassword() {
    alert(this.formValues.email.value);
    const message = `An email has been sent to ${this.formValues.email.value}.
      \n Please click on the Reset password button to access Citgo`;
    this.loginProcess.showEmailNotification(message);
  }

  toLogin() {
    this.loginProcess.showLogin();
  }

}
