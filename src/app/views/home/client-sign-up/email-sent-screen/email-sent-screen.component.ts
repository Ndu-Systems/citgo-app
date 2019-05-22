import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-sent-screen',
  templateUrl: './email-sent-screen.component.html',
  styleUrls: ['./email-sent-screen.component.scss']
})
export class EmailSentScreenComponent implements OnInit {
  progress: string;

  constructor(private accountService:AccountService) { }

  ngOnInit() {
    let process = this.accountService.getRegistraionProcess();
     // let email = process.user.Email;
     let email = 'ndu@mail.com';
     this.progress = `To ensure that your email account is valid, we have sent you an email to  ${email} to  verify your account,  please check your mailbox`;
  }
  backHome(){
    console.log(this.accountService.getRegistraionProcess());
    
    this.accountService.finishRegistrationProcess();
  }
}
