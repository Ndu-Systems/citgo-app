import { Component, OnInit } from '@angular/core';
import { CleintService, AuthenticateService } from 'src/app/services';
import { Client } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  client: Client;
  rForm: FormGroup;
  constructor(private clientService: CleintService,
    private fb: FormBuilder,
    private authenticateService: AuthenticateService) {
      this.rForm = this.fb.group({
        Password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
        Email: [null, Validators.required]
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
      Password: [this.client.Password, Validators.required],
      confirmPassword: [null, Validators.required],
      Email: [this.client.Email, Validators.required]
    });
  }

}
