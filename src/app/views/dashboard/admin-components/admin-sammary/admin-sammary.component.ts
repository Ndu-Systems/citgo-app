import { Component, OnInit } from '@angular/core';
import { StatService } from "src/app/services";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-sammary',
  templateUrl: './admin-sammary.component.html',
  styleUrls: ['./admin-sammary.component.scss']
})
export class AdminSammaryComponent implements OnInit {
stat$:Observable<any> = this.statService.getAdminStat();
  constructor(private statService:StatService, private router:Router) { }

  ngOnInit() {
  }
goToShares(status){
this.router.navigate([`/dashboard/shares/${status}`])
}
goToClients(status){
  this.router.navigate([`/dashboard/clients/${status}`])
  }
}
