import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ExitModalEventEmmiter, Investment } from 'src/app/models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService, InvestmentService } from 'src/app/services';
@Component({
  selector: 'app-buy-share',
  templateUrl: './buy-share.component.html',
  styleUrls: ['./buy-share.component.scss']
})
export class BuyShareComponent implements OnInit {
  @Output() closeBuySharesModalAction: EventEmitter<ExitModalEventEmmiter> = new EventEmitter();
  rForm: FormGroup;
  error = '';
  loading;
  currentUser;
  investmentsList: Investment[]=[];
  canBuy:boolean= true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticateService,
    private investmentService: InvestmentService
  ) { 
     //get user shares -for naming purpose e.g  Share 1
     this.investmentService.clientshares.subscribe(val => {
      if(val && val.length){
        this.investmentsList = val;

        if(this.investmentsList.filter(x=>x.StatusId==2).length >0){
          alert(`You can not buy shares while you have pending shares`);
          setTimeout(()=>{
           this.closeModal();
          },1000)
        }
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
    this.closeBuySharesModalAction.emit({
      close: true
    });
  }


  buy(data) {
    this.error = '';
    console.log('NEW SHARE', data);
    this.investmentService.buyShares(data).subscribe(response => {
      if(response.investments){
        this.investmentService.setInvestments(response.investments);

       }
    })
    this.closeModal();
  }
}
