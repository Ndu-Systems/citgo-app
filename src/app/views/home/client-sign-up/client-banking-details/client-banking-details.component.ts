import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getCurrentUser, LAST_INSERT_ID } from "src/app/shared/config";
import { BankingInfoService, SignUpProcessService } from "src/app/services";
import { ConfirmationService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-client-banking-details",
  templateUrl: "./client-banking-details.component.html",
  styleUrls: ["./client-banking-details.component.scss"]
})
export class ClientBankingDetailsComponent implements OnInit {
  rForm: FormGroup;
  message: string = "";
  UserId: string = getCurrentUser();
  clientId: string;

  constructor(
    private fb: FormBuilder,
    private bankingInfoService: BankingInfoService,
    private signUpProcessService: SignUpProcessService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.clientId = r["id"];
    });
  }

  ngOnInit() {
    this.rForm = this.fb.group({
      BankName: [null, Validators.required],
      AccountHolder: [null, Validators.required],
      BankBranch: [null],
      AccountNumber: [
        null,
        [
          Validators.required,
          Validators.min(11111111),
          Validators.max(999999999999999)
        ]
      ],
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
      message:
        "Are you sure you want to exit without saving your bank details?",
      accept: () => {
        this.signUpProcessService.closeAllSignUpForms();
        this.signUpProcessService.showVerificationMailSent();
      }
    });
  }

  insertBankingInfo(data) {
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
    this.bankingInfoService.addBankingInfo(data).subscribe(response => {
      if (response) {
        this.router.navigate(["/client-beneficiaries", this.clientId]);
      } else {
        alert(`Error: ${response}`);
      }
    });
  }
}
