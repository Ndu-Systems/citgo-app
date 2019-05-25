import { AuthenticateService } from "src/app/services/home/user/authenticate.service";
import { User } from "src/app/models/user";
import { CleintService } from "src/app/services";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-my-refferals",
  templateUrl: "./my-refferals.component.html",
  styleUrls: ["./my-refferals.component.scss"]
})
export class MyRefferalsComponent implements OnInit {
  refferals$: Observable<any>;
  clientId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cleintService: CleintService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.clientId = r["id"];
    });
  }

  ngOnInit() {
    this.refferals$ = this.cleintService.getClientReferrals(this.clientId);
  }
}
