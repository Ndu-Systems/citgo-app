import { Component, OnInit } from '@angular/core';
import { SHARE_PENDING_VERFICATION, SHARE_ACTIVE, BONUS_PERCENT } from 'src/app/shared/config';
import { Observable } from 'rxjs';
import { Investment, Client } from 'src/app/models';
import { InvestmentService, CleintService } from 'src/app/services';
import { BonusService } from 'src/app/services/dashboard/bonus.service';
import { MessageService } from 'primeng/api';
import { SpinnerProcessService } from 'src/app/services/app-state/spinner-process.service';
import { ActivatedRoute } from '@angular/router';
import { Bonus } from 'src/app/models/bonus.model';
import { WithdrawalService } from 'src/app/services/dashboard/withdrawal/withdrawal.service';

@Component({
  selector: 'app-with-drawals',
  templateUrl: './with-drawals.component.html',
  styleUrls: ['./with-drawals.component.scss']
})
export class WithDrawalsComponent implements OnInit {

  withdrawals$: Observable<any[]>;
  statusId: any;
  search:string;
  constructor(
    private withdrawalService: WithdrawalService,
    private bonusService: BonusService,
    private messageService: MessageService,
    private cleintService: CleintService,
    private spinnerProcessService: SpinnerProcessService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.statusId = r['id'];
      this.withdrawals$ =  this.withdrawalService.gettWithdrawalByStatus(this.statusId || 2)
    });
  }

  ngOnInit() {}
  // Approve(data: Investment) {
  //   data.StatusId = SHARE_ACTIVE;
  //   this.spinnerProcessService.showSpinner();
  //   this.withdrawalService.update(data).subscribe(res => {
  //     let updatedInvestment: Investment = res;
  //     if (updatedInvestment.StatusId == SHARE_ACTIVE) {
  //       this.messageService.add({
  //         life: 7000,
  //         severity: 'success',
  //         summary: 'Now active! ',
  //         detail: 'Share approved!'
  //       });

  //       //update list 
  //       this.spinnerProcessService.closeSpinner();

  //       //check if client have a parent
  //       this.cleintService
  //         .getClientById(updatedInvestment.ClientId)
  //         .subscribe(clientRes => {
  //           let client: Client = clientRes;
  //           if (client.ClientId && client.ParentId) {

  //             //update the current list

  //             let bonus: Bonus = {
  //               Amount: updatedInvestment.Amount * BONUS_PERCENT,
  //               ClientId: client.ParentId,
  //               ParentId: updatedInvestment.ClientId,
  //               CreateUserId: 'SYS',
  //               ModifyUserId: 'SYS',
  //               StatusId: 1
  //             };

  //             // grant a bonus
  //             this.bonusService.addBonus(bonus).subscribe(cli => {
  //               let bunusReceiver: Client = cli;
  //               this.messageService.add({
  //                 life: 7000,
  //                 severity: 'success',
  //                 summary: 'Now active! ',
  //                 detail: `Referral bonus of R ${updatedInvestment.Amount *
  //                   BONUS_PERCENT}  granted to ${bunusReceiver.FirstName} ${
  //                   bunusReceiver.Surname
  //                 }`
  //               });
  //             });
  //           }
  //         });
  //     }
  //   });
  // }
  Approve(){
    alert('todo')
  }
}
