import { UserNotification } from './../../models/processes/notification.process.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  NotificationProcessModel,
  initNotificationProcessModel
} from "src/app/models/processes/notification.process.model";

@Injectable({
  providedIn: "root"
})
export class NotificationProcessService {
  clientNotificationProcess = new BehaviorSubject<NotificationProcessModel>(
    initNotificationProcessModel
  );
  castNotificationProcess = this.clientNotificationProcess.asObservable();
  constructor() {}

  getNotificationProcess() {
    return this.clientNotificationProcess.value;
  }
  getInvestmentId() {
    return this.clientNotificationProcess.value.InvestmentId;
  }

  updateNotificationProcessState(data: UserNotification[]) {
    let state = this.getNotificationProcess();
    state.notifications = data;
    this.clientNotificationProcess.next(state);
  }
  showUplaod() {
    let state = this.getNotificationProcess();
    state.showUplaod = true;
    this.clientNotificationProcess.next(state);
  }
  updateInvestementId(data) {
    let state = this.getNotificationProcess();
    state.InvestmentId = data;
    this.clientNotificationProcess.next(state);
  }
  closeUplaod() {
    let state = this.getNotificationProcess();
    state.showUplaod = false;
    this.clientNotificationProcess.next(state);
  }
}
