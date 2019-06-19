import { Component, OnInit } from '@angular/core';
import { CleintService, AuthenticateService } from 'src/app/services';
import { Client } from 'src/app/models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UPDATE_CLIENT_ERROR, PASSWORD_DONT_MATCH_ERROR, PASSWORD_EXISTS_ERROR, OLD_PASSWORD_DONT_MATCH_ERROR } from 'src/app/shared/config';
import { MessageService } from 'primeng/components/common/api';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  client: Client;
  rForm: FormGroup;
  error;
  constructor(private clientService: CleintService,
    private fb: FormBuilder,
    private authenticateService: AuthenticateService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.rForm = this.fb.group({
      Email: [null, Validators.required],
      CellphoneNumber: [null, Validators.required],
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      MiddleName: [null, Validators.required],
      IDNumber: [null, Validators.required],

      City: [null, Validators.required],
      Province: [null, Validators.required],
      Country: [null, Validators.required],
      PostCode: [null, Validators.required],
      Address: [null, Validators.required],

      Gender: [null, Validators.required],

      // change password
      Password: [null, Validators.required],
      confirmPassword: [null],
      oldPassword: [null],
      newPassword: [null],
      password: [null],

    });
  }

  ngOnInit() {
    const user = this.authenticateService.currentUserValue;
    this.clientService.getClientById(user.ClientId).subscribe(response => {
      if (response.ClientId) {
        this.client = response;
        this.buildForm();
      }
    });
  }

  buildForm() {
    this.rForm = this.fb.group({
      Email: [this.client.Email, Validators.required],
      CellphoneNumber: [this.client.CellphoneNumber, Validators.required],
      FirstName: [this.client.FirstName, Validators.required],
      Surname: [this.client.Surname, Validators.required],
      MiddleName: [this.client.MiddleName, Validators.required],
      IDNumber: new FormControl(this.client.IDNumber,[Validators.required, Validators.minLength(8),Validators.maxLength(16)]),


      City: [this.client.City, Validators.required],
      Province: [this.client.Province, Validators.required],
      Country: [this.client.Country, Validators.required],
      PostCode: [this.client.PostCode, Validators.required],
      Address: [this.client.Address],

      Gender: [this.client.Gender, Validators.required],


      // change password
      Password: [this.client.Password, Validators.required],
      confirmPassword: [null],
      oldPassword: [null],
      newPassword: [null],
      password: [null],

    });
  }

  get formValues() {
    return this.rForm.controls;
  }

  updateProfile() {
    this.error = '';
    this.client.Email = this.formValues.Email.value;
    this.client.CellphoneNumber = this.formValues.CellphoneNumber.value;
    this.client.FirstName = this.formValues.FirstName.value;
    this.client.Surname = this.formValues.Surname.value;
    this.client.IDNumber = this.formValues.IDNumber.value;
    this.client.City = this.formValues.City.value;
    this.client.Province = this.formValues.Province.value;
    this.client.Country = this.formValues.Country.value;
    this.client.PostCode = this.formValues.PostCode.value;
    this.client.Address = this.formValues.Address.value;
    this.client.Gender = this.formValues.Gender.value;
debugger
    if (this.formValues.oldPassword.value !== null && this.formValues.newPassword.value !== null) {
      if(this.formValues.oldPassword.value !== this.client.Password){
        this.error = OLD_PASSWORD_DONT_MATCH_ERROR;
        return;
      }
      if (this.formValues.newPassword.value === this.client.Password) {
        this.error = PASSWORD_EXISTS_ERROR;
        return;
      }
      if (this.formValues.newPassword.value !== this.formValues.confirmPassword.value) {
        this.error = PASSWORD_DONT_MATCH_ERROR;
        return;
      }
      this.client.Password = this.formValues.newPassword.value;
    }
    this.clientService.updateClient(this.client).subscribe(response => {
      if (response != null) {
        this.messageService.add({ life:4000,severity:'success', summary: 'You are up todate!', detail:'Your details are updated successfully!'});

        this.router.navigate(['/dashboard']);
      } else {
        this.error = UPDATE_CLIENT_ERROR;
      }
    });
  }

}
