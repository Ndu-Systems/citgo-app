import { Component, OnInit, Input } from '@angular/core';
import { SignUpProcessService } from 'src/app/services';
import { Router } from '@angular/router';
import { LAST_INSERT_EMAIL } from 'src/app/shared/config';

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
    let email = localStorage.getItem(LAST_INSERT_EMAIL) || 'your email address'
    this.progress = `To ensure that your email address is valid, we have sent you an email to  ${email}, to  verify your account,  please check your mailbox`;
  }
  backHome() {
    this.signUpProcessService.finishRegistrationProcess();
    this.router.navigate(['/']);
  }
}
