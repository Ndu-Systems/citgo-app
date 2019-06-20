import { Bank } from "./../../../../../models/bank.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser, LAST_INSERT_ID } from "src/app/shared/config";
import { BankingInfoService, SignUpProcessService } from "src/app/services";
import { ConfirmationService, MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Component({
  selector: "app-update-baning-info",
  templateUrl: "./update-baning-info.component.html",
  styleUrls: ["./update-baning-info.component.scss"]
})
export class UpdateBaningInfoComponent implements OnInit {
  rForm: FormGroup;
  message: string = "";
  UserId: string = getCurrentUser();
  clientId: string;
  bankingDetails: Bank;

  constructor(
    private fb: FormBuilder,
    private bankingInfoService: BankingInfoService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem(LAST_INSERT_ID);

    //get banking
    this.bankingInfoService.getBankingInfo(this.clientId).subscribe(r => {
      if (r) {
        this.bankingDetails = r[0];
        this.rForm = this.fb.group({
          BankName: [this.bankingDetails.BankName, Validators.required],
          BankBranch: [this.bankingDetails.BankBranch],
          AccountNumber: [
            this.bankingDetails.AccountNumber,
            [
              Validators.required,
              Validators.min(11111111),
              Validators.max(999999999999999)
            ]
          ],
          AccountType: [this.bankingDetails.AccountType, Validators.required],
          CreateUserId: [this.bankingDetails.CreateUserId, Validators.required],
          StatusId: [this.bankingDetails.StatusId, Validators.required],
          ClientId: [this.bankingDetails.ClientId, Validators.required],
          BankingDetailsId: [this.bankingDetails.BankingDetailsId, Validators.required],
        });
      }
    });
  }



  updateBankingInfo(data) {
    let brancCodes: any[] = [
      {
        bank: "ABSA Bank",
        code: "632 005"
      },
      {
        bank: "Bank of Athens",
        code: "410 506"
      },
      {
        bank: "Bidvest Bank",
        code: "462 005"
      },
      {
        bank: "Capitec Bank",
        code: "470 010"
      },
      {
        bank: "FNB",
        code: "250 655"
      },
      {
        bank: "Investec",
        code: "580 105"
      },
      {
        bank: "Nedbank",
        code: "198 765"
      },
      {
        bank: "SA Post Bank",
        code: "460 005"
      },
      {
        bank: "Standard Bank",
        code: "051 001"
      }
    ];
    data.BankBranch = brancCodes.filter(x => x.bank == data.BankName)[0].code;
    this.bankingInfoService.updateBankingInfo(data).subscribe(response => {
      if (response) {
        this.messageService.add({
          life: 4000,
          severity: "success",
          summary: "You are up to date!",
          detail: "Your details are updated successfully!"
        });
        this.back()
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
  back() {
    this.router.navigate(["/dashboard/my-profile"]);
  }
}

