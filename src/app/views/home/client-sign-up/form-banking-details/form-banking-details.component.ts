import { BankingInfoService } from "./../../services/bankingInfo.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CloseModalEventEmmiter } from "src/app/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  getCurrentUser,
  LAST_INSERT_ID,
  WEB_HOST,
  VERIFICATIONLINK
} from "src/app/shared/config";
import { EmailService } from "src/app/services/email.service";

@Component({
  selector: "app-form-banking-details",
  templateUrl: "./form-banking-details.component.html",
  styleUrls: ["./form-banking-details.component.scss"]
})
export class FormBankingDetailsComponent implements OnInit {
  @Output() closeModalAction: EventEmitter<
    CloseModalEventEmmiter
  > = new EventEmitter();

  /*
Form begin here
*/
  rForm: FormGroup;

  //validation
  message: string = "";

  /*
Form ends here
*/
  UserId: string = getCurrentUser();
  clientId: string;
  showVerificationEmailSent: boolean;
  progress: string;

  constructor(
    private fb: FormBuilder,
    private bankingInfoService: BankingInfoService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem(LAST_INSERT_ID);
    this.rForm = this.fb.group({
      BankName: [null, Validators.required],
      BankBranch: [null],
      AccountNumber: [null, Validators.required],
      AccountType: [null, Validators.required],
      CreateUserId: [this.clientId, Validators.required],
      StatusId: [1, Validators.required],
      ClientId: [this.clientId, Validators.required]
    });
    this.rForm.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  closeModal() {
    this.closeModalAction.emit({
      closeAll: true,
      showBankingInfoForm: false,
      showBenefitariesForm: false,
      showPersonalInfoForm: false
    });
  }

  insertBankingInfo(data) {
    console.log("Insert Banking Info: ", data);
    this.bankingInfoService.addBankingInfo(data).subscribe(response => {
      if (response.UserId) {
        let link = `${WEB_HOST}/#/${VERIFICATIONLINK}/${response.UserId}`;
        this.verifyAcc(response.FirstName, response.Email, link);
      }
      if (response) {
        console.log("response", response);
        this.closeModalAction.emit({
          closeAll: false,
          showBankingInfoForm: false,
          showBenefitariesForm: true,
          showPersonalInfoForm: false
        });
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
  verifyAcc(name, email, link) {
    let data = {
      name: name,
      email: email,
      link: link
    };
    this.emailService.sendVerifyAcc(data).subscribe(r => {
      // alert(JSON.stringify(r))
      this.showVerificationEmailSent = true;
      this.progress = `To ensure that your email account is valid, we have sent you an email to  ${email} to  verify your account,  please check your mailbox`;
    });
  }
}
