import { BeneficiariesService } from './../../../../services/home/beneficiaries.service';
import { Component, OnInit } from "@angular/core";
import { CleintService, AuthenticateService } from "src/app/services";
import { Client } from "src/app/models";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent implements OnInit {
  client: Client;
  error;
  fullname: string;
  email: string;
  beneficiaries: any;
  constructor(
    private clientService: CleintService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private beneficiariesService: BeneficiariesService,
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
}
