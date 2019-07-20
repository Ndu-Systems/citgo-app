import { Clientwithdrawals } from './../../../models/client.withdrawals.model';
import { WithdrawalService } from './../../../services/dashboard/withdrawal/withdrawal.service';
import { Bonus } from './../../../models/bonus.model';
import { BonusService } from './../../../services/dashboard/bonus.service';
import { Withdrawal, withdrawalInit } from './../../../models/withdrawal.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Investment } from 'src/app/models';
import { AuthenticateService, InvestmentService } from 'src/app/services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { SHARE_PENDING, WITHDRAWABLE } from 'src/app/shared/config';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-do-withdrawal',
  templateUrl: './do-withdrawal.component.html',
  styleUrls: ['./do-withdrawal.component.scss']
})
export class DoWithdrawalComponent implements OnInit {
  cleintId;
  rForm: FormGroup;
  error = '';
  currentUser: User;
  canBuy = true;
  profits: any[];
  total: number;
  nextProfitAmount: number;
  profit: number;
  funds = localStorage.getItem(WITHDRAWABLE);

  withdrawal: Withdrawal = withdrawalInit;
  investmentsList: Investment[] = [];

  // get funds data


  maturityDate: Date;
  bonuses: any = [];
  clientwithdrawals: any;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticateService,
    private investmentService: InvestmentService,
    private withdrawalService: WithdrawalService,
    private bonusService: BonusService,
    private confirmationService: ConfirmationService,
    private routeTo: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.cleintId = r['id'];
    });
    // get user shares -for naming purpose e.g  Share 1
    this.investmentService.castClientshares.subscribe(val => {
      if (val && val.length) {
        this.investmentsList = val;
      }
    });

    // get bonuses
            this.bonusService.getClientBonuses(this.cleintId).subscribe(r => {
          this.bonuses = r;
        });


        // get client withdrawals
         this.withdrawalService.getClientWithdrawal(this.cleintId).subscribe(r => {
           this.clientwithdrawals = r;
         });
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.rForm = this.fb.group({
      Amount: [
        this.withdrawal.Amount,
        Validators.compose([
          Validators.required,
          Validators.min(1000),
          Validators.max(Number(this.funds) || 0)
        ])
      ],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      StatusId: [2],
      ClientId: [this.cleintId],
    });
  }

  withdraw(data: Withdrawal) {
    this.confirmationService.confirm({
      message: `You are withdraw an amount of R${data.Amount}, continue?`,
      accept: () => {
        this.error = '';
        this.withdrawalService.addWithdrawal(data).subscribe(response => {
       alert(JSON.stringify(response));
        });
      }
    });
  }

}
