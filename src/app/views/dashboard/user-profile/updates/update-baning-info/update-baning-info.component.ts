import { Bank } from "./../../../../../models/bank.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser, LAST_INSERT_ID } from "src/app/shared/config";
import { BankingInfoService, SignUpProcessService } from "src/app/services";
import { ConfirmationService, MessageService } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-update-baning-info",
  templateUrl: "./update-baning-info.component.html",
  styleUrls: ["./update-baning-info.component.scss"]
})
export class UpdateBaningInfoComponent implements OnInit {
  rForm: FormGroup;
  message: string = "";
  bankingDetails: Bank;
  clientId: any;

  constructor(
    private fb: FormBuilder,
    private bankingInfoService: BankingInfoService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(r => {
      this.clientId = r["id"];
      this.bankingInfoService.getBankingInfo(this.clientId).subscribe(r => {
        if (r) {
          this.bankingDetails = r[0];
        } else {
          this.bankingDetails = {
            BankingDetailsId: null,
            ClientId: this.clientId,
            BankName: "",
            BankBranch: "",
            AccountNumber: "",
            AccountType: "432432",
            CreateUserId: this.clientId,
            ModifyUserId: this.clientId,
            StatusId: "1"
          };
        }

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
          BankingDetailsId: [this.bankingDetails.BankingDetailsId]
        });
      });
    });
    //get banking
  }

  updateBankingInfo(data: Bank) {
    if (!data.BankingDetailsId) {
      this.createNewBank(data);
      return false;
    }
    data.BankBranch = this.brancCodes.filter(
      x => x.bank == data.BankName
    )[0].code;
    this.bankingInfoService.updateBankingInfo(data).subscribe(response => {
      if (response) {
        this.messageService.add({
          life: 4000,
          severity: "success",
          summary: "You are up to date!",
          detail: "Your details are updated successfully!"
        });
        this.back();
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
  createNewBank(data: Bank) {
    data.BankBranch = this.brancCodes.filter(
      x => x.bank == data.BankName
    )[0].code;
    this.bankingInfoService.addBankingInfo(data).subscribe(response => {
      if (response) {
        this.messageService.add({
          life: 4000,
          severity: "success",
          summary: "You are up to date!",
          detail: "Your details are updated successfully!"
        });
        this.back();
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
  back() {
    this.router.navigate(["/dashboard/my-profile"]);
  }
  brancCodes: any[] = [
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
}
