import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentService } from 'src/app/services';
import { Observable } from 'rxjs';
import { Investment } from 'src/app/models';

@Component({
  selector: 'app-share-details',
  templateUrl: './share-details.component.html',
  styleUrls: ['./share-details.component.scss']
})
export class ShareDetailsComponent implements OnInit {

  investment:Investment;
  investmentId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private investmentService: InvestmentService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.investmentId = r["id"];
    });
  }

  ngOnInit() {
   this.investmentService.getInvestmentsById(this.investmentId).subscribe(inv=>{
     this.investment = inv;
   })
  }

}
