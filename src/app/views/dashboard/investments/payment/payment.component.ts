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
  constructor(private router:Router, private investmentService:InvestmentService, private activatedRoute: ActivatedRoute,
    ) {
      this.activatedRoute.params.subscribe(r => {
        this.investmentId = r["id"];
        this.investmentService.getInvestmentsById(this.investmentId).subscribe(r=>{
          this.amount = r.Amount;
        })
      });
     }

  ngOnInit() {
  }
next(){
  this.isDone = true
}
done(){
  this.isDone = false
 this.router.navigate(['dashboard']);
}
}
