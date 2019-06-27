export interface Withdrawal {
    WithdrawalId?:  string;
    Amount?:  number;
    CreateDate?:  string;
    CreateUserId?:  string;
    ModifyDate?:  string;
    ModifyUserId?:  string;
    StatusId?:  number;
}

export const withdrawalInit:Withdrawal = {
    "WithdrawalId": null,
    "Amount":0,
    "CreateDate": null,
    "CreateUserId":null,
    "ModifyDate": null,
    "ModifyUserId": null,
    "StatusId": 1
}
