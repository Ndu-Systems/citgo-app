import { EmailService } from "./../../../services/shared-services/email/email.service";
import { Client } from "src/app/models";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { CleintService } from "src/app/services";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-enquire",
  templateUrl: "./enquire.component.html",
  styleUrls: ["./enquire.component.scss"]
})
export class EnquireComponent implements OnInit {
  rForm: FormGroup;
  client: Client;
  clientId = "";
  done: boolean;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private cleintService: CleintService,
    private routeTo: Router,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.clientId = r["id"];
    });
  }

  ngOnInit() {
    this.cleintService.getClientById(this.clientId).subscribe(r => {
      this.client = r;
      this.rForm = this.fb.group({
        name: [`${this.client.FirstName} ${this.client.FirstName}`],
        email: [this.client.Email],
        subject: ["", Validators.required],
        body: ["", Validators.required]
      });
    });
  }
  submit(data) {
    this.emailService.sendEnquiry(data).subscribe(r => {
      this.done = true;
    });
  }
}
