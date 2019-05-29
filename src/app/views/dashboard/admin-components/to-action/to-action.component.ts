import {
  SHARE_PENDING_VERFICATION,
  SHARE_ACTIVE
} from "./../../../../shared/config";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { InvestmentService } from "src/app/services";
import { Investment } from "src/app/models";

@Component({
  selector: "app-to-action",
  templateUrl: "./to-action.component.html",
  styleUrls: ["./to-action.component.scss"]
})
export class ToActionComponent implements OnInit {
  shares$: Observable<
    Investment[]
  > = this.investmentService.getInvestmentsByStatus(SHARE_PENDING_VERFICATION);
  constructor(private investmentService: InvestmentService) {}

  ngOnInit() {}
  Approve(data: Investment) {
    data.StatusId = SHARE_ACTIVE;
    this.investmentService.updateInvestment(data).subscribe(res => {
      alert(JSON.stringify(res));
    });
  }
}
