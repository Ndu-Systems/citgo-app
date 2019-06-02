import { AuthenticateService } from './../../../../services/home/user/authenticate.service';
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BuySharesProcessService } from "src/app/services/app-state/buy-shares-process.service";
import { User } from 'src/app/models/user';

@Component({
  selector: "app-client-stats",
  templateUrl: "./client-stats.component.html",
  styleUrls: ["./client-stats.component.scss"]
})
export class ClientStatsComponent implements OnInit {
  cleintId: any;
  constructor(
    private router: Router,
    private buySharesProcessService: BuySharesProcessService,
    private authenticateService:AuthenticateService
  ) {}

  ngOnInit() {
let user:User = this.authenticateService.currentUserValue;
this.cleintId = user.ClientId;
  }
  AddRef() {
    this.router.navigate([
      "dashboard/my-refferals",
     this.cleintId
    ]);
  }
  buyShares() {
    this.buySharesProcessService.showBuyShares();
  }
}
