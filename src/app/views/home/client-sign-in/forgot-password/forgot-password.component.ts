import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services';

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

  get formValues() {
    return this.rForm.controls;
  }

  forgotPassword() {
   alert(this.formValues.email.value);
  }

}
