import { Profit } from "./../../../models/profit.model";
import { InvestmentProfitService } from "./../../../services/investment/investment-profit.service";
import { Money } from "./../../../models/money.model";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { AuthenticateService } from "src/app/services";
import { User } from "src/app/models/user";

@Component({
  selector: "app-profit",
  templateUrl: "./profit.component.html",
  styleUrls: ["./profit.component.scss"]
})
export class ProfitComponent implements OnInit {
  data: any;
  windrawal: Money;
  cleintId: string = "";
  clientProfits: Profit[];
  coloredProfitList: any[] = [];
  user: User;
  colors = [
    "#a70a856b",
    "#16a085",
    "#2c3e50",
    "#f1c40f",
    "#3498db",
    "#a70a856b",
    "#16a085",
    "#2c3e50",
    "#f1c40f",
    "#3498db",
    "#a70a856b",
    "#16a085",
    "#2c3e50",
    "#f1c40f",
    "#3498db",
    "#a70a856b",
    "#16a085",
    "#2c3e50",
    "#f1c40f",
    "#3498db"
  ];
  currency: string = "R";
  bonus = 300.75;

  constructor(
    private messageService: MessageService,
    private investmentProfitService: InvestmentProfitService,
    private authenticationService: AuthenticateService
  ) {}

  selectData(event) {
    this.messageService.add({
      severity: "info",
      summary: "Data Selected",
      detail: this.data.datasets[event.element._datasetIndex].data[
        event.element._index
      ]
    });
  }

  ngOnInit() {
    //get user
    this.user = this.authenticationService.currentUserValue;
    this.cleintId = this.user.ClientId;

    this.investmentProfitService.getProfits(this.cleintId).subscribe(r => {
      if (r.length) {
        this.clientProfits = r;
        console.log(this.clientProfits);
        this.getGraphData();
      }
    });
    this.getWidrawal();
  }

  getWidrawal() {
    this.windrawal = {
      currency: this.currency,
      rand: "00",
      cents: "00"
    };
  }

  getGraphData() {
    let result = [];
    let months: any[] = this.clientProfits.map(x => x.PMonth);
    var uniqueMonths = [];
    months.forEach(m => {
      if (uniqueMonths.indexOf(m) < 0) {
        uniqueMonths.push(m);
      }
    });

    let colorIndex = 0;
    this.clientProfits.forEach(prof => {
      let isNew = result.filter(x => x.id == prof.InvestmentId).length == 0;
      if (isNew) {
        //add
        result.push({
          label: prof.InvestmentName,
          id: prof.InvestmentId,
          data: [Number(prof.ProfitAmount)],
          fill: true,
          borderColor: this.colors[colorIndex++]
        });
        // colorIndex++;
      } else {
        //apend
        let i = result.indexOf(
          result.filter(x => x.id == prof.InvestmentId)[0]
        );
        result[i].data.push(Number(prof.ProfitAmount));
      }
    });
    console.log("data of the g:   ", result);
    this.loadGraph(result, uniqueMonths);
    this.loadColoredList(result);
  }
  loadGraph(result, months) {
    console.log("result months", result);

    this.data = {
      labels: months,
      datasets: [...result]
    };
  }

  loadColoredList(data: any[]) {
    let withdrwalSum = 0;
    data.forEach(v => {
      this.coloredProfitList.push({
        color: v.borderColor,
        name: v.label,
        amount: v.data.reduce(this.getSum, 0)
      });
      withdrwalSum += v.data.reduce(this.getSum, 0);
    });
    console.log("this.coloredProfitList", this.coloredProfitList);
    this.windrawal = {
      currency: this.currency,
      rand:  Math.round(withdrwalSum + this.bonus),
      cents:  Math.round(((withdrwalSum + this.bonus) % 1) * 100) || "00"
    };
  }
  getSum(total, num) {
    return total + Math.round(num);
  }
}
