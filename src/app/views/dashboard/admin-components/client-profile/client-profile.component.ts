import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models';
import { CleintService, AuthenticateService, BeneficiariesService, EmailService } from 'src/app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

  client: any;
  fullname: string;
  email: string;
  beneficiaries: any;
  isDone: boolean;
  cell: any;
  constructor(
    private clientService: CleintService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private beneficiariesService: BeneficiariesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(r => {
      let id = r["id"];
      this.clientService.getClientById(id).subscribe(response => {
        if (response.ClientId) {
          this.client = response;
          this.fullname = `${this.client.FirstName} ${this.client.Surname}`;
          this.email = this.client.Email;
          this.cell = this.client.CellphoneNumber;
        }
      });


      this.beneficiariesService.geBeneficiaries(id).subscribe(response => {
        this.beneficiaries = [];
        if (response) {
          this.beneficiaries = response;
        }
      });
    });


  }

  back() {
    this.router.navigate(["/dashboard"]);
  }

  block() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.client.StatusId = "10";
        this.clientService.updateClient(this.client).subscribe(r => {

          this.messageService.add({
            life: 7000,
            severity: "warn",
            summary: "Client blocked",
            detail: "You  blocked !" + this.client.FirstName
          });
          // this.router.navigate(["/dashboard"]);
          this.client.ClientStatus = "10"

        })
      }
    });

  }
  unblock() {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.client.StatusId = "4";
        this.clientService.updateClient(this.client).subscribe(r => {
          this.messageService.add({
            life: 7000,
            severity: "success",
            summary: "Client unblocked",
            detail: "You  unblocked !" + this.client.FirstName
          });
          this.client.ClientStatus = "4"
          // this.router.navigate(["/dashboard"]);
        })

      }
    });



  }

}
