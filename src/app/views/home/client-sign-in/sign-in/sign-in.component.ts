import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExitModalEventEmmiter } from 'src/app/models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/services/user/authenticate.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() closeSigninModalAction: EventEmitter<ExitModalEventEmmiter> = new EventEmitter();
  rForm: FormGroup;
  loading = false;
  error = ''; // TODO : Authentication Service
  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private loginService: AuthenticateService,
  ) {
  
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: [null, Validators.required]
    });
  }
  closeModal() {
    this.closeSigninModalAction.emit({
      close: true
    });
  }

  // convinient for easy form(rForm) data access
  get f() { return this.rForm.controls; }

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
          this.routeTo.navigate(["/dashboard"]);
          // this.spinnerService.hideSpinner();
        } else {
          this.error = response;
        }
      });
  }

}
