 
export interface Investment {
    InvestmentId?: string;
    Amount: number;
    Profit: number;
    Total: number;
    Name?: string;
    Type?: string;
    InvestmentDate?: Date;
    CreateDate?: Date;
    CreateUserId?: string;
    ModifyDate?: Date;
    ModifyUserId?: string;
    StatusId: number;
}
