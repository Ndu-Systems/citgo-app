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

  updateNotificationProcessState(data: NotificationProcessModel) {
    this.clientNotificationProcess.next(data);
  }
}
