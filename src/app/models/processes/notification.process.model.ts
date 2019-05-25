export interface NotificationProcessModel{
notifications:UserNotification[];
}
export const initNotificationProcessModel:NotificationProcessModel = {
    notifications:[]
}
export interface UserNotification{
    message:string;
    id:number;
}