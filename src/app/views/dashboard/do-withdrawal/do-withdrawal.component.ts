import { Withdrawal, withdrawalInit } from "./../../../models/withdrawal.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Investment } from "src/app/models";
import {
  AuthenticateService,
  InvestmentService,
  NotificationProcessService
} from "src/app/services";
import { MessageService, ConfirmationService } from "primeng/api";
import { Router } from "@angular/router";
import { UserNotification } from "src/app/models/processes/notification.process.model";
import { SHARE_PENDING, WITHDRAWABLE } from "src/app/shared/config";
import { WithdrawalService } from "src/app/services/dashboard/withdrawal/withdrawal.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-do-withdrawal",
  templateUrl: "./do-withdrawal.component.html",
  styleUrls: ["./do-withdrawal.component.scss"]
})
export class DoWithdrawalComponent implements OnInit {
  rForm: FormGroup;
  error = "";
  currentUser: User;
  investmentsList: Investment[] = [];
  canBuy: boolean = true;
  profits: any[];
  total: number;
  nextProfitAmount: number;
  profit: number;
  funds = localStorage.getItem(WITHDRAWABLE);

  withdrawal: Withdrawal = withdrawalInit;

  maturityDate: Date;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticateService,
    private investmentService: InvestmentService,
    private withdrawalService: WithdrawalService,
    private confirmationService: ConfirmationService,
    private routeTo: Router
  ) {
    //get user shares -for naming purpose e.g  Share 1
    this.investmentService.castClientshares.subscribe(val => {
      if (val && val.length) {
        this.investmentsList = val;
      }
    });
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.rForm = this.fb.group({
      Amount: [
        this.withdrawal.Amount,
        Validators.compose([
          Validators.required,
          Validators.min(100),
          Validators.max(Number(this.funds) || 0)
        ])
      ],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      StatusId: [1]
    });
  }

  withdraw(data:Withdrawal) {
    this.confirmationService.confirm({
      message: `You are withdraw an amount of R${data.Amount}, continue?`,
      accept: () => {
        this.error = "";
        this.withdrawalService.addWithdrawal(data).subscribe(response => {
          if (response) {
           let addedWithdrawal:Withdrawal = response;
           if(addedWithdrawal.WithdrawalId){
             let amount = data.Amount;

           }
          }
        });
      }
    });
  }

}
