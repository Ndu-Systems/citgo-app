import { SHARE_PENDING_VERFICATION } from 'src/app/shared/config';
import { Component, OnInit } from '@angular/core';
import { CleintService } from 'src/app/services';
import { Observable } from 'rxjs';
import { ClientShares } from 'src/app/models/admin/user.shares.model';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit {
clients$:Observable<ClientShares[]> = this.cleintService.getClientShares();
  constructor(private cleintService:CleintService) { }

  ngOnInit() {
  }

}
