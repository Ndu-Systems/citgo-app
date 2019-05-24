import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { SignUpProcessService } from 'src/app/services/app-state/sign-up-process.service';

@Component({
  selector: 'app-email-sent-screen',
  templateUrl: './email-sent-screen.component.html',
  styleUrls: ['./email-sent-screen.component.scss']
})
export class EmailSentScreenComponent implements OnInit {
  progress: string;

  constructor(private signUpProcessService:SignUpProcessService) { }

  ngOnInit() {
    let process = this.signUpProcessService.getRegistraionProcess();
     let email = process.user.Email;
    //  let email = 'ndu@mail.com';
     this.progress = `To ensure that your email account is valid, we have sent you an email to  ${email} to  verify your account,  please check your mailbox`;
  }
  backHome(){    
    this.signUpProcessService.finishRegistrationProcess();
  }
}
