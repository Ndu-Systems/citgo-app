import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models';
// Mock investment model
const INVESTMENTS: Investment[] = [

  {
    InvestmentId: '21524522131',
    Amount: 5000,
    Profit: 0,
    Total: 0,
    Name: 'Test dummy',
    Type: 'Month_to_month',
    StatusId: 1
  },

  {
    InvestmentId: '21524522131',
    Amount: 5000,
    Profit: 0,
    Total: 0,
    Name: 'Test dummy',
    Type: 'Month_to_month',
    StatusId: 1
  }
];


@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})


export class InvestmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  page = 1;
  pageSize = 4;
  collectionSize = INVESTMENTS.length;

  get investments(): Investment[] {
    return INVESTMENTS
      .map((investment, i) => ({ id: i + 1, ...investment }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
