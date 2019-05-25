export interface NotificationProcessModel{
notifications:UserNotification[];
showUplaod:boolean;
InvestmentId:string;
}
export const initNotificationProcessModel:NotificationProcessModel = {
    notifications:[],showUplaod:false,InvestmentId:''
}
export interface UserNotification{
    message:string;
    id:any;
    isShare:boolean;
}