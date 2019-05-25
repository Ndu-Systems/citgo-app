import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginProcessService } from 'src/app/services/app-state/login-process.service';
import { AuthenticateService } from 'src/app/services/home/user/authenticate.service';
import {  WEB_HOST, RESET_PASSWORD } from 'src/app/shared/config';
import { EmailService } from 'src/app/services';

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
    private emailService: EmailService,
    private authenticateService: AuthenticateService,
    private loginProcess: LoginProcessService
  ) {

  }
  ngOnInit() {
    this.rForm = this.fb.group({
      email: new FormControl('youremail@example.com', Validators.compose([
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
    this.authenticateService.getUserByEmail(this.formValues.email.value).subscribe(response => {
      if (response) {
        debugger
        const link = `${WEB_HOST}/#/${RESET_PASSWORD}/${response}`;
        const data = {
          name: this.formValues.email.value,
          email: this.formValues.email.value,
          link: link
        };

        this.emailService.sendForgotPasswordEmail(data).subscribe(response => {
          if (response) {
            const message = `An email has been sent to ${this.formValues.email.value}.
            Please click on the Reset password button to change password & access Citgo`;
            this.loginProcess.showEmailNotification(message);
          }
        });
      } else {
        this.error = `User with ${this.formValues.email.value} couldn't be found!`;
      }
    });
  }

  toLogin() {
    this.loginProcess.showLogin();
  }

}
