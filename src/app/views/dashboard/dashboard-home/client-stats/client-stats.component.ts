import { AuthenticateService } from './../../../../services/home/user/authenticate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { InvestmentService, CleintService } from 'src/app/services';
import { Investment } from 'src/app/models';
import {
  WITHDRAWABLE, STATUS_WITHDRAWAL_PENDING, STATUS_WITHDRAWAL_APPROVED,
  STATUS_WITHDRAWAL_PAID, STATUS_WITHDRAWAL_ACTIVE
} from 'src/app/shared/config';
import { Wallet } from 'src/app/models/wallet.model';
import { WithdrawalService } from 'src/app/services/dashboard/withdrawal/withdrawal.service';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { MessageService, ConfirmationService } from 'primeng/api';


export interface Detail {
  key: string;
  value: number;
  days: number;
  available: number;
}
@Component({
  selector: 'app-client-stats',
  templateUrl: './client-stats.component.html',
  styleUrls: ['./client-stats.component.scss']
})
export class ClientStatsComponent implements OnInit {
  cleintId: any;
  investments: Investment[] = [];
  // details: Detail[] = [];
  // funds
  totalProfit = 0;
  availableProfit = 0;
  availableFunds = 0;
  availableBonus = 0;
  totalBonuses = 0;
  withdrawn = 0;
  client$;
  client: any;
  withDisabled: boolean;
  clientwithdrawals: Withdrawal[];
  withdrawalUpdate: string;
  withdrawId: string;
  minimumWithdrawal = 750;

  pendingNoticeStop;
  constructor(
    private router: Router,
    private investmentService: InvestmentService,
    private authenticateService: AuthenticateService,
    private cleintService: CleintService,
    private withdrawalService: WithdrawalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    const user: User = this.authenticateService.currentUserValue;
    this.cleintId = user.ClientId;
    this.client$ = this.cleintService.getClientById(this.cleintId);
    // get wallet
    this.investmentService.getClientWallet(this.cleintId).subscribe(r => {
      const wallet: Wallet = r;
      const profit = Number(wallet.profit);
      const bonuses = Number(wallet.bonuses);
      const withdrawals = Number(wallet.withdrawals);
      this.availableFunds = (profit + bonuses) - withdrawals;
      this.totalBonuses = bonuses;
      this.totalProfit = profit;
      this.withdrawn = withdrawals;
      if (this.availableFunds >= this.minimumWithdrawal) {
        this.withDisabled = true;
        if (!this.isDateGoodForMe()) {
          this.withDisabled = false;
          this.withdrawalUpdate = `Please note!  All Withdrawals must be done between the 20th to 28th of every month`;
        }
      }
      this.availableBonus = bonuses;
      this.availableProfit = profit;
      // get avilbale bonus
      if (withdrawals > 0) {
        if (profit > bonuses && withdrawals <= bonuses) {
          this.availableBonus = bonuses - withdrawals;
        } else {
          this.availableBonus = 0;
          this.availableProfit = this.availableFunds;
        }
        if (bonuses > profit && withdrawals <= profit) {
          this.availableBonus = bonuses - withdrawals;
          this.availableProfit = profit;
        }
      }


    });

    // get withdrawal
    this.withdrawalService.getClientWithdrawal(this.cleintId).subscribe(r => {
      this.clientwithdrawals = r;
      if (this.clientwithdrawals.length) {



        // check pending
        const pendings = this.clientwithdrawals.filter(x => Number(x.StatusId) === Number(STATUS_WITHDRAWAL_PENDING));
        let amount = pendings.reduce((sum, item) => sum + Number(item.Amount), 0);
        if (pendings.length) {
          this.withDisabled = false;
          this.withdrawalUpdate = `
          We have received your withdrawal of R${amount}, withdrawals are processed within 5 business days
           after the 1st of each and every month. There may be a delay if we are unable to verify your information.
          `;

          this.pendingNoticeStop = `You can not place a withdrawal while you still have pending withdrawal`;
        }

        // check aprroved
        const aproved = this.clientwithdrawals.filter(x => Number(x.StatusId) === Number(STATUS_WITHDRAWAL_APPROVED));
        amount = aproved.reduce((sum, item) => sum + Number(item.Amount), 0);
        if (aproved.length) {
          this.withDisabled = false;
          this.withdrawalUpdate = `
          Congratulations! your withdrawal  of  R${amount} has been approved!.
          Your funds shall be processed and paid out
          to your registered account within 5  business days..
          `;

          this.pendingNoticeStop = `You can not place a withdrawal while you still have pending withdrawal`;

        }

        // check paid
        const paid = this.clientwithdrawals.filter(x => Number(x.StatusId) === Number(STATUS_WITHDRAWAL_PAID));
        amount = paid.reduce((sum, item) => sum + Number(item.Amount), 0);
        if (paid.length) {
          this.withDisabled = false;
          this.withdrawId = paid[0].WithdrawalId;
          this.withdrawalUpdate = `
            Great news! We can confirm R${amount} has just left Citgo Africa Oil and is winging its way to your bank account.`;

            this.pendingNoticeStop = `You can not place a withdrawal while you still have pending withdrawal`;

        }
      }
      console.log(r);
    });
  }
  isDateGoodForMe() {
    const date = new Date();
   return date.getDate() >= 20 && date.getDate() <= 28;
  // return true;

  }
  AddRef() {
    this.router.navigate(['dashboard/my-refferals', this.cleintId]);
  }
  withdraw() {
    localStorage.setItem(WITHDRAWABLE, this.availableFunds + '');
    this.router.navigate(['dashboard/do-withdrawal', this.cleintId]);
  }
  buyShares() {
    // this.buySharesProcessService.showBuyShares();
    this.router.navigate(['dashboard/buy-share', this.cleintId]);
  }
  confirmMoney() {
    this.confirmationService.confirm({
      message: `This confirms that you have received your withdrawl  payment, continue?`,
      accept: () => {
        const data = this.clientwithdrawals.filter(x => x.WithdrawalId === this.withdrawId)[0];
        data.StatusId = STATUS_WITHDRAWAL_ACTIVE;
        data.ModifyUserId = this.cleintId;
        this.withdrawalService.update(data).subscribe(r => {
          console.log(r);
          this.messageService.add({
            life: 7000,
            severity: 'success',
            summary: 'Well done! ',
            detail: 'Withdrawal paid!'
          });
          this.withDisabled = true;
          this.withdrawalUpdate = undefined;

          if (this.availableFunds >= this.minimumWithdrawal) {
            this.withDisabled = true;
            this.pendingNoticeStop = undefined;
          }
        });
      }
    });
  }
}
