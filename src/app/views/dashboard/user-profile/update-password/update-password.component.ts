import { Component, OnInit } from '@angular/core';
import { UserProfileProcessService } from 'src/app/services/app-state/user-profile-process.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PASSWORD_DONT_MATCH_ERROR } from 'src/app/shared/config';
import { User } from 'src/app/models/user';
import { AuthenticateService, UserService } from 'src/app/services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  rForm: FormGroup;
  loading = false;
  error = '';
  currentUser: User;
  heading;
  constructor(
    private fb: FormBuilder,
    private userProfileProcess: UserProfileProcessService,
    private authenticateService: AuthenticateService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userProfileProcess.castUserProfileProcess.subscribe(process => {
      if (process.resetPasswordMessage != null) {
        this.heading = process.resetPasswordMessage;
      }      
    });
    this.rForm = this.fb.group({
      Password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });

    // get current user
    const user = this.authenticateService.currentUserValue;
    this.authenticateService.getFullClientDetails(user.UserId).subscribe(response => {
      if (response.UserId) {
        this.currentUser = response;
      }
    });
  }

  get formValues() {
    return this.rForm.controls;
  }

  updatePassword() {
    this.error = '';
    if (this.formValues.Password.value !== this.formValues.confirmPassword.value) {
      this.error = PASSWORD_DONT_MATCH_ERROR;
    }
    this.currentUser.Password = this.formValues.Password.value;
    this.userService.updateUser(this.currentUser).subscribe(Response => {
      if (Response) {
        // lOGIN USER
        this.authenticateService
          .loginUser(this.currentUser.Email, this.currentUser.Password)
          .pipe(first())
          .subscribe(response => {
            if (response) {
              this.userProfileProcess.updateUserProfileProcessState({ resetPasswordMessage: "reset your password." })
              this.router.navigate(["/dashboard"]);
            } else {
              this.error = response;
            }
          });
      }
    })
  }

}
