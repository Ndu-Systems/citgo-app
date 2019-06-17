import { Investment } from 'src/app/models';
import { InvestmentService } from 'src/app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  isDone= false;
  investmentId: string;
  amount: number;
  isFnb=true;
  isStandardBank=false;
  investment:Investment;
  bankId: number = 1;
  constructor(private router:Router, private investmentService:InvestmentService, private activatedRoute: ActivatedRoute,
    ) {
      this.activatedRoute.params.subscribe(r => {
        this.investmentId = r["id"];
        this.investmentService.getInvestmentsById(this.investmentId).subscribe(r=>{
          this.amount = r.Amount;
          this.investment = r;
        })
      });
     }

  ngOnInit() {
  }
next(){
  this.isDone = true;

this.investment.bankId = this.bankId;
  this.investmentService.updateInvestment(this.investment).subscribe(r=>{
    console.log(r);
    
  })
}
done(){
  this.isDone = false
 this.router.navigate(['dashboard']);
}
selectBank(bankName:string, id:number){
  this.bankId = id;
if(id==1){
  this.isFnb= true;
  this.isStandardBank=false;
}else if(id==2){
  this.isFnb= false;
  this.isStandardBank=true;
}
}
}
