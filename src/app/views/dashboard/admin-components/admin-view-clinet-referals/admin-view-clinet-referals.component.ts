import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CleintService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-view-clinet-referals',
  templateUrl: './admin-view-clinet-referals.component.html',
  styleUrls: ['./admin-view-clinet-referals.component.scss']
})
export class AdminViewClinetReferalsComponent implements OnInit {

  refferals$: Observable<any>;
  clientId: any;
  constructor(
    private cleintService: CleintService, private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.clientId = r['id'];

    });
  }

  ngOnInit() {
    this.refferals$ = this.cleintService.getClientReferrals(this.clientId);
  }
}
