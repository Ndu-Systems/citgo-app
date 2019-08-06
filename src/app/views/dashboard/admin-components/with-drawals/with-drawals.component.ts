import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { WithdrawalService } from 'src/app/services/dashboard/withdrawal/withdrawal.service';
import {
  STATUS_WITHDRAWAL_PENDING, STATUS_WITHDRAWAL_APPROVED,
  STATUS_WITHDRAWAL_DECLINED, STATUS_WITHDRAWAL_PAID
} from 'src/app/shared/config';
import { Withdrawal } from 'src/app/models/withdrawal.model';

@Component({
  selector: 'app-with-drawals',
  templateUrl: './with-drawals.component.html',
  styleUrls: ['./with-drawals.component.scss']
})
export class WithDrawalsComponent implements OnInit {
  STATUS_WITHDRAWAL_DECLINED = STATUS_WITHDRAWAL_DECLINED;
  withdrawals$: Observable<any[]>;
  statusId: any;
  search: string;
  status = '';
  constructor(
    private withdrawalService: WithdrawalService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.statusId = r['id'];
      this.status += this.statusId + '_' + STATUS_WITHDRAWAL_APPROVED;
        this.withdrawals$ = this.withdrawalService.gettWithdrawalByStatus(this.status);
    });
  }

  ngOnInit() { }

  Approve(data: Withdrawal) {
    this.confirmationService.confirm({
      message: `You are about to confirm this withdrawal, continue?`,
      accept: () => {
        data.StatusId = STATUS_WITHDRAWAL_APPROVED;
        data.ModifyUserId = 'Admin';
        this.withdrawalService.update(data).subscribe(r => {
          console.log(r);
          this.withdrawals$ = this.withdrawalService.gettWithdrawalByStatus(this.status);
          this.messageService.add({
            life: 7000,
            severity: 'success',
            summary: 'Next is payout! ',
            detail: 'Withdrawal approved!'
          });
        });
      }
    });
  }

  Decline(data: Withdrawal) {
    this.confirmationService.confirm({
      message: `You are about to decline this withdrawal, continue?`,
      accept: () => {
        data.StatusId = STATUS_WITHDRAWAL_DECLINED;
        data.ModifyUserId = 'Admin';
        this.withdrawalService.update(data).subscribe(r => {
          console.log(r);
          this.withdrawals$ = this.withdrawalService.gettWithdrawalByStatus(this.status);
          // this.withdrawals$ = this.withdrawalService.gettWithdrawalByStatus(this.status);
          this.messageService.add({
            life: 7000,
            severity: 'warn',
            summary: 'Opps! ',
            detail: 'Withdrawal declined!'
          });
        });
      }
    });
  }


  Pay(data: Withdrawal) {
    this.confirmationService.confirm({
      message: `This confirms that you have made the payment to this client, continue?`,
      accept: () => {
        data.StatusId = STATUS_WITHDRAWAL_PAID;
        data.ModifyUserId = 'Admin';
        this.withdrawalService.update(data).subscribe(r => {
          console.log(r);
          this.withdrawals$ = this.withdrawalService.gettWithdrawalByStatus(this.status);
          this.messageService.add({
            life: 7000,
            severity: 'success',
            summary: 'Well done! ',
            detail: 'Withdrawal paid!'
          });
        });
      }
    });
  }
  onChange(deviceValue) {
    console.log(deviceValue);
    this.withdrawals$ = this.withdrawalService.gettWithdrawalByStatus(deviceValue);

}
}
