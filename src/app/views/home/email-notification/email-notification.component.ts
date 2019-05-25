import { Component, OnInit, Input } from '@angular/core';
import { LoginProcessService } from 'src/app/services/app-state/login-process.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit {
  @Input() message: string;
  constructor(
    private loginProcess: LoginProcessService,
    private router: Router
  ) { }
  ngOnInit() {
  }
  backHome() {
    this.loginProcess.closeAll();
    this.router.navigate(['/']);
  }
}
