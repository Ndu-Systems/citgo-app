import { SHARE_PENDING_VERFICATION } from "src/app/shared/config";
import { Component, OnInit } from "@angular/core";
import { CleintService, BeneficiariesService } from "src/app/services";
import { Observable } from "rxjs";
import { ClientShares } from "src/app/models/admin/user.shares.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-all-clients",
  templateUrl: "./all-clients.component.html",
  styleUrls: ["./all-clients.component.scss"]
})
export class AllClientsComponent implements OnInit {
  clients: ClientShares[] = [];
  statusId: any;
  beneficiaries = [];
  constructor(
    private cleintService: CleintService,
    private activatedRoute: ActivatedRoute,
    private beneficiariesService: BeneficiariesService,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.statusId = r["id"];
      this.cleintService.getClientsByStatus(this.statusId || 4).subscribe(r => {
        if (r) {
          this.clients = r;
        }
      });
    });
  }

  ngOnInit() {}
  getBenefiries(ClientId) {
    this.beneficiariesService.geBeneficiaries(ClientId).subscribe(response => {
      this.beneficiaries = [];
      if (response) {
        this.beneficiaries = response;
      }
    });
  }
}
