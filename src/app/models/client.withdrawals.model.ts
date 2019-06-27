

export interface Clientwithdrawals {
    Id?:  string;
    ClientId?:  string;
    WithdrawalId?:  string;
    SourceInvestmentId?:  string;
    SourceBonusId?:  string;
    Amount?:  number;
    CreateUserId?:  string;
    CreateDate?:  string;
    ModifyUserId?:  string;
    ModifyDate?:  string;
    StatusId?:  number;
};



export const clientwithdrawalsInit:Clientwithdrawals = {
 
        "Id": null,
        "ClientId": null,
        "WithdrawalId":null,
        "SourceInvestmentId": null,
        "SourceBonusId": null,
        "Amount": 0,
        "CreateUserId": null,
        "CreateDate": null,
        "ModifyUserId": null,
        "ModifyDate": null,
        "StatusId": 1
    }
