 
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
    ClientId?: string;
}


export interface InvestmentDocument {
    InvestmentId: string;
    ClientId: string;
    Amount: string;
    Profit: string;
    Total: string;
    Name: string;
    Type: string;
    InvestmentDate: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    DocumentId: string;
    DocumentCode: string;
    DocumentName: string;
    DocumentUrl: string;
}

