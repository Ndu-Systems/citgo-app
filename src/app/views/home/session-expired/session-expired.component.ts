import { Router } from '@angular/router';
import { LoginProcessService } from 'src/app/services/app-state/login-process.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  constructor(private loginProcessService:LoginProcessService, private router:Router) {
    this.loginProcessService.closeAll()
   }

  ngOnInit() {
  }
  login(){
    this.router.navigate(["sign-in"])
  }
  home(){
this.router.navigate([""])
  }
}
