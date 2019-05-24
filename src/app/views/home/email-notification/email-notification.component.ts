import { Component, OnInit, Input } from '@angular/core';
import { LoginProcessService } from 'src/app/services/app-state/login-process.service';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.scss']
})
export class EmailNotificationComponent implements OnInit {
  @Input() message: string;
  constructor(
    private loginProcess: LoginProcessService
  ) { }
  ngOnInit() {
  }
  backHome() {
    this.loginProcess.closeAll();
  }
}
