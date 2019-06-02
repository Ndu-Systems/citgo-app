import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BuySharesProcessService } from "src/app/services/app-state/buy-shares-process.service";

@Component({
  selector: "app-client-stats",
  templateUrl: "./client-stats.component.html",
  styleUrls: ["./client-stats.component.scss"]
})
export class ClientStatsComponent implements OnInit {
  constructor(
    private router: Router,
    private buySharesProcessService: BuySharesProcessService
  ) {}

  ngOnInit() {}
  AddRef() {
    this.router.navigate([
      "dashboard/my-refferals",
      "a39d846a-61b3-11e9-ac92-80fa5b452iie"
    ]);
  }
  buyShares() {
    this.buySharesProcessService.showBuyShares();
  }
}
