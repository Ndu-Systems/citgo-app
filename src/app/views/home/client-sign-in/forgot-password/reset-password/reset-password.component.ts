import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService, UserService } from 'src/app/services';
import { MessageService } from 'primeng/api';
import { PASSWORD_DONT_MATCH_ERROR } from 'src/app/shared/config';
import { first } from 'rxjs/operators';
import { UserProfileProcessService } from 'src/app/services/app-state/user-profile-process.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValiDatePassword } from 'src/app/models/validate.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  rForm: FormGroup;
  notShowing = true;
  error = '';
  currentUser: User;
  validations;
  validator = new ValiDatePassword('');
  userId: any;
  isDone: boolean;
  constructor(
    private fb: FormBuilder,
    private userProfileProcess: UserProfileProcessService,
    private authenticateService: AuthenticateService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r['id'];
    });
    this.validations = this.validator.validate();
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      OldPassword: ['Nan'],
      Password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    });

    // get current user

    this.authenticateService
      .getFullClientDetails(this.userId)
      .subscribe(response => {
        if (response.UserId) {
          this.currentUser = response;
        }
      });

    this.rForm.valueChanges.subscribe(data => {
      this.validator = new ValiDatePassword(data.Password || '');
      console.log(data);
      this.validations = this.validator.validate();
    });
  }

  get formValues() {
    return this.rForm.controls;
  }

  updatePassword() {
    this.error = '';
    if (
      !this.validations.LENGHT.pass ||
      !this.validations.LOWER.pass ||
      !this.validations.UPPER.pass ||
      !this.validations.DIGITS.pass ||
      !this.validations.SPECIAL.pass
    ) {
      this.messageService.add({
        life: 7000,
        severity: 'warn',
        summary: 'Opps!',
        detail: 'Sorry password requirements are not met.'
      });
      return false;
    }
    if (
      this.formValues.Password.value !== this.formValues.confirmPassword.value
    ) {
      this.messageService.add({
        life: 7000,
        severity: 'warn',
        summary: 'Opps!',
        detail: PASSWORD_DONT_MATCH_ERROR
      });
      return false;
    }
    this.currentUser.Password = this.formValues.Password.value;
    this.userService.verifyUser(this.currentUser).subscribe(Response => {
      if (Response) {
      this.isDone = true;      }
    });
  }
  show() {
    const inputpass = document.getElementById('pass');
    const inputpasscon = document.getElementById('inputpasscon');

    if (this.notShowing) {
      this.notShowing = false;
      inputpass.attributes['type'].value = 'text';
      inputpasscon.attributes['type'].value = 'text';

    } else {
      this.notShowing = true;
      inputpass.attributes['type'].value = 'password';
      inputpasscon.attributes['type'].value = 'password';
    }

  }

  login() {
    this.router.navigate(['/sign-in']);
  }
}
