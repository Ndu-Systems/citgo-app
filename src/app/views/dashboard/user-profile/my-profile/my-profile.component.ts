import { UPDATE_CONTACT_INFO } from './../../../../shared/config';
import { EmailService } from './../../../../services/shared-services/email/email.service';
import { BeneficiariesService } from './../../../../services/home/beneficiaries.service';
import { Component, OnInit } from "@angular/core";
import { CleintService, AuthenticateService } from "src/app/services";
import { Client } from "src/app/models";
import { Router } from "@angular/router";
import { WEB_HOST } from 'src/app/shared/config';

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent implements OnInit {
  client: Client;
  fullname: string;
  email: string;
  beneficiaries: any;
  isDone: boolean;
  constructor(
    private clientService: CleintService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private beneficiariesService: BeneficiariesService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    const user = this.authenticateService.currentUserValue;
    this.clientService.getClientById(user.ClientId).subscribe(response => {
      if (response.ClientId) {
        this.client = response;
        this.fullname = `${this.client.FirstName} ${this.client.Surname}`;
        this.email = this.client.Email;
      }
    });

    this.beneficiariesService.geBeneficiaries(user.ClientId).subscribe(response => {
      this.beneficiaries=[];
      if (response) {
        this.beneficiaries = response;
      }
    });
  }

  back() {
    this.router.navigate(["/dashboard"]);
  }
  sendChangeEmailConfirmation() {
    let link   = `${WEB_HOST}/#/${UPDATE_CONTACT_INFO}/${this.client.UserId}`;

    let data = {
      name: this.client.FirstName,
      email: this.client.Email,
      link: link
    };
    this.emailService.sendChangePass(data).subscribe(r => {
      this.isDone = true;
    });
  }
}
