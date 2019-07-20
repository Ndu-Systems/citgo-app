export interface Withdrawal {
    WithdrawalId?:  string;
    Amount?:  number;
    CreateDate?:  string;
    CreateUserId?:  string;
    ModifyDate?:  string;
    ModifyUserId?:  string;
    StatusId?:  number;
    ClientId?:  number;

    
}

export const withdrawalInit:Withdrawal = {
    "WithdrawalId": null,
    "Amount":null,
    "CreateDate": null,
    "CreateUserId":null,
    "ModifyDate": null,
    "ModifyUserId": null,
    "StatusId": 1,
    "ClientId": null,
}
