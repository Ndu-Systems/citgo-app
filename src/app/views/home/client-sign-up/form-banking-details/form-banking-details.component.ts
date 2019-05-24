import { BankingInfoService } from "./../../services/bankingInfo.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CloseModalEventEmmiter } from "src/app/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser, LAST_INSERT_ID } from "src/app/shared/config";
import { AccountService } from "../../services/account.service";
import { SignUpProcessService } from "src/app/services/app-state/sign-up-process.service";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-form-banking-details",
  templateUrl: "./form-banking-details.component.html",
  styleUrls: ["./form-banking-details.component.scss"]
})
export class FormBankingDetailsComponent implements OnInit {
  rForm: FormGroup;
  message: string = "";
  UserId: string = getCurrentUser();
  clientId: string;

  constructor(
    private fb: FormBuilder,
    private bankingInfoService: BankingInfoService,
    private signUpProcessService: SignUpProcessService,
    private confirmationService: ConfirmationService
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
    this.confirmationService.confirm({
      message: 'Are you sure you want to exit without saving?',
      accept: () => {
        this.signUpProcessService.closeAllSignUpForms();
        this.signUpProcessService.showVerificationMailSent();
      }
  });
  }

  insertBankingInfo(data) {
    console.log("Insert Banking Info: ", data);
    this.bankingInfoService.addBankingInfo(data).subscribe(response => {
      if (response) {
        console.log("response", response);
        this.signUpProcessService.showBeneficiariesInfoForm();
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
}
