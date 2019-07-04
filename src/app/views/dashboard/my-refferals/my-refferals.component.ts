import { MessageService } from 'primeng/api';
import { AuthenticateService } from "src/app/services/home/user/authenticate.service";
import { User } from "src/app/models/user";
import { CleintService } from "src/app/services";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { WEB_HOST, REFERALLINK } from 'src/app/shared/config';

@Component({
  selector: "app-my-refferals",
  templateUrl: "./my-refferals.component.html",
  styleUrls: ["./my-refferals.component.scss"]
})
export class MyRefferalsComponent implements OnInit {
  refferals$: Observable<any>;
  clientId: any;
  mylink='';
  showTip: boolean=true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cleintService: CleintService,
    private messageService: MessageService
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.clientId = r["id"];
      this.mylink = `${WEB_HOST}/#/${REFERALLINK}/${ this.clientId}`;

    });
  }

  ngOnInit() {
    this.refferals$ = this.cleintService.getClientReferrals(this.clientId);
  }
 
  copylink() {
    this.copyText(this.mylink);
    this.messageService.add({
      severity: "success",
      summary: "Share link",
      detail: "Your link is copied"
    });
  }
 
  copyText(val: string) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  closeTip(){
    this.showTip=false;
  }
}
