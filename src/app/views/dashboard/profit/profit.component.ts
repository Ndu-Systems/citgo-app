import { Profit } from "./../../../models/profit.model";
import { InvestmentProfitService } from "./../../../services/investment/investment-profit.service";
import { Money } from "./../../../models/money.model";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-profit",
  templateUrl: "./profit.component.html",
  styleUrls: ["./profit.component.scss"]
})
export class ProfitComponent implements OnInit {
  data: any;
  windrawal: Money;
  cleintId: string = "a39d846a-61b3-11e9-ac92-80fa5b45280e";
  clientProfits: Profit[];

  constructor(
    private messageService: MessageService,
    private investmentProfitService: InvestmentProfitService
  ) {
    this.data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Test dummy",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: "#a70a856b"
        },
        {
          label: "Test dummy",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: true,
          borderColor: "#2ECC71"
        }
      ]
    };
  }

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
      currency: "R",
      rand: "1025",
      cents: "75"
    };
  }

  getGraphData() {
    let result = [];
    this.clientProfits.forEach(prof => {
      let isNew = result.filter(x=>x.id == prof.InvestmentId).length == 0;
      if (isNew) {
        //add
        result.push({
          name: prof.InvestmentName,
          id:  prof.InvestmentId,
          data: [prof.ProfitAmount]
        });
      } else {
        //apend
        let i = result.indexOf(result.filter(x=>x.id == prof.InvestmentId)[0]);
        result[i].data.push(prof.ProfitAmount)
      }
    });
    console.log("data of the g:   ", result);
  }
}
