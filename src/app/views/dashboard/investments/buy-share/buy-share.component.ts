import { BuySharesProcessService } from './../../../../services/app-state/buy-shares-process.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExitModalEventEmmiter, Investment } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService, InvestmentService, NotificationProcessService } from 'src/app/services';
import { UserNotification } from 'src/app/models/processes/notification.process.model';
import { SHARE_PENDING } from 'src/app/shared/config';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-buy-share',
  templateUrl: './buy-share.component.html',
  styleUrls: ['./buy-share.component.scss']
})
export class BuyShareComponent implements OnInit {
  rForm: FormGroup;
  error = '';
  loading;
  currentUser;
  investmentsList: Investment[]=[];
  canBuy:boolean= true;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticateService,
    private investmentService: InvestmentService,
    private notificationProcessService: NotificationProcessService,
    private messageService: MessageService,
    private buySharesProcessService:BuySharesProcessService

  ) { 
     //get user shares -for naming purpose e.g  Share 1
     this.investmentService.castClientshares.subscribe(val => {
      if(val && val.length){
        this.investmentsList = val;
      }
   
    });
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.rForm = this.fb.group({
      Amount: ['', Validators.required],
      Name: [`Share ${this.investmentsList.length+1}`, Validators.required],
      Type: ['', Validators.required],
      ClientId: [this.currentUser.ClientId]
    });

   
  }

  closeModal() {
    this.buySharesProcessService.closeBuyShares()
  }


  buy(data) {
    this.error = '';
    //check 

    if(this.investmentsList.filter(x=>x.StatusId==2).length >0){
      this.messageService.add({severity:'warn', summary:'Sorry!', detail:'You can not buy shares while you have pending shares'});
       this.closeModal();
    }

    //end check
    this.investmentService.buyShares(data).subscribe(response => {
      if(response.investments){
        this.investmentService.setInvestments(response.investments);
          // update notifications
          let nots:UserNotification[] =this.notificationProcessService.getNotificationProcess().notifications.filter(x=>x.isShare==true); 
          let newInvestement:Investment = response.investments.filter(x => Number(x.StatusId) == SHARE_PENDING)[0];
          if(newInvestement.InvestmentId){
            nots.push({ id: newInvestement.InvestmentId,isShare:true, message: `Please uplaod proof of payment for ${newInvestement.Name}` });
          }
          this.notificationProcessService.updateNotificationProcessState(nots);
     
       }
    })
    this.closeModal();
  }
}
