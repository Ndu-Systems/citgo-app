import { Component, OnInit, Input } from '@angular/core';
import { SignUpProcessService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-sent-screen',
  templateUrl: './email-sent-screen.component.html',
  styleUrls: ['./email-sent-screen.component.scss']
})
export class EmailSentScreenComponent implements OnInit {
  progress: string;

  constructor(private signUpProcessService: SignUpProcessService,
    private router: Router
    ) { }

  ngOnInit() {
    let process = this.signUpProcessService.getRegistraionProcess();
    let email = process.user.Email;
    this.progress = `To ensure thnat your email account is valid, we have sent you an email to  ${email} to  verify your account,  please check your mailbox`;
  }
  backHome() {
    this.signUpProcessService.finishRegistrationProcess();
    this.router.navigate(['/']);
  }
}
