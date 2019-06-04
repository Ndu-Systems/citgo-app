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
  explainContract: string;
  widrawalDay: string;
  profits: any[];
  total: number;
  widrawalDayAmount: number;
  profit: number;
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
      Amount: [null, Validators.compose([Validators.required, Validators.min(5000), Validators.max(200000)])],
      Name: [`Share ${this.investmentsList.length+1}`, Validators.required],
      Type: ['', Validators.required],
      ClientId: [this.currentUser.ClientId]
    });

    this.rForm.valueChanges.subscribe(data => {
 
      let capitalization = Number(data.Type);
      let amount = data.Amount;
      var today = new Date();

      if (capitalization > 0) {
        //contact
        this.explainContract =
          "Your shares will increase with 15% Compounded  Monthly";
        var widrawDate = new Date(
          today.setMonth(today.getMonth() + capitalization)
        );
        this.widrawalDay = `${this.formatDate(widrawDate)}`;
        this.getCompoundGrowth(amount, capitalization);
      } else {
        // month ro month
        this.explainContract =
          "Your share value  will increase with 15% Monthly, No compound amount eligible";
        var widrawDate = new Date(today.setMonth(today.getMonth() + 1));
        this.widrawalDay = `${this.formatDate(widrawDate)}`;
        this.geFlatGrowth(amount);
      }
    
    });
  }

  closeModal() {
    this.buySharesProcessService.closeBuyShares()
  }

  getCompoundGrowth(amount: number, months: number) {
    this.profits = [];

    if (!amount || !months) return false;
    this.total = amount;
    for (let i = 0; i < 12; i++) {
      this.total += this.total * 0.15;
      if (i === months) {
        this.widrawalDayAmount = Math.abs(amount - this.total);
      }
      this.profits.push(Math.round(this.total));
    }
    if(months == 12){
      this.widrawalDayAmount = Math.abs(amount - this.total);

    }
    this.profit = Math.abs(amount - this.total);
 
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

      if (i === 0) {
        this.widrawalDayAmount = Math.abs(amount - this.total);
      }
    }
    this.profit = Math.abs(amount - this.total);
  }
}
