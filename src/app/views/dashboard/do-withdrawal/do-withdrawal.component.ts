import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Investment } from 'src/app/models';
import { AuthenticateService, InvestmentService, NotificationProcessService } from 'src/app/services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserNotification } from 'src/app/models/processes/notification.process.model';
import { SHARE_PENDING, WITHDRAWABLE } from 'src/app/shared/config';

@Component({
  selector: 'app-do-withdrawal',
  templateUrl: './do-withdrawal.component.html',
  styleUrls: ['./do-withdrawal.component.scss']
})
export class DoWithdrawalComponent implements OnInit {

  rForm: FormGroup;
  error = "";
  loading;
  currentUser;
  investmentsList: Investment[] = [];
  canBuy: boolean = true;
  profits: any[];
  total: number;
  nextProfitAmount: number;
  profit: number;
  funds = localStorage.getItem(WITHDRAWABLE)
  explainContract =
    "Your shares will increase with the fixed interest rate of 15% monthly";
  maturityDate: Date;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticateService,
    private investmentService: InvestmentService,
    private notificationProcessService: NotificationProcessService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private routeTo:Router
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
        null,
        Validators.compose([
          Validators.required,
          Validators.min(100),
          Validators.max(Number(this.funds) || 0)
        ])
      ],
      Name: [`Share ${this.investmentsList.length + 1}`, Validators.required],
      Type: ["12", Validators.required],
      ClientId: [this.currentUser.ClientId]
    });

    this.rForm.valueChanges.subscribe(data => {
      let amount = data.Amount;
     this.maturityDate =  new Date(new Date().setFullYear(new Date().getFullYear() + 1))


      if (amount > 0) {
        this.geFlatGrowth(amount);
      }
    });
  }

  withdraw(data) {
    alert('under construction')
    return false;
    this.confirmationService.confirm({
      message: `You are about to buy shares for R${data.Amount}, continue?`,
      accept: () => {
        

    this.error = "";
    if (this.investmentsList.filter(x => x.StatusId == 2).length > 0) {
      this.messageService.add({
        life: 7000,
        severity: "warn",
        summary: "Sorry!",
        detail: "You can not buy shares while you have pending shares"
      });
      return 0;
    }

    this.investmentService.buyShares(data).subscribe(response => {
      if (response.investments) {
        this.investmentService.setInvestments(response.investments);
        // update notifications
        this.messageService.add({
          life: 7000,
          severity: "success",
          summary: "Well Done!",
          detail: "Your shares order was placed successfully"
        });

        let nots: UserNotification[] = this.notificationProcessService
          .getNotificationProcess()
          .notifications.filter(x => x.isShare == true);
        let newInvestement: Investment = response.investments.filter(
          x => Number(x.StatusId) == SHARE_PENDING
        )[0];
        if (newInvestement.InvestmentId) {
          nots.push({
            id: newInvestement.InvestmentId,
            isShare: true,
            message: `Please uplaod proof of payment for ${newInvestement.Name}`
          });


        }
        this.notificationProcessService.updateNotificationProcessState(nots);

        this.routeTo.navigate(['dashboard/payment', newInvestement.InvestmentId])
      }
    });
      }
    });

  }
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  formatDate(date: Date) {
    return (
      date.getDay() +
      " " +
      this.monthNames[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  }
  geFlatGrowth(amount: number) {
    this.profits = [];
    if (!amount) return false;

    this.total = amount;
    for (let i = 0; i < 12; i++) {
      this.total += amount * 0.15;

      this.profits.push(Math.round(this.total));

    
    }
    this.profit = Math.abs(amount - this.total);
    this.nextProfitAmount  = .15*amount;
  }
}
