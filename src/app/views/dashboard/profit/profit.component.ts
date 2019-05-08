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

  constructor(private messageService: MessageService) {
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
    this.getWidrawal();
  }

  getWidrawal(){
    this.windrawal = {
      currency:'R',rand:'1025', cents: '75'
    }

  }
}

