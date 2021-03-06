 
export interface Investment {
    InvestmentId?: string;
    Amount: number;
    Profit: number;
    Total: number;
    Growth?: number;
    Name?: string;
    Type?: string;
    Ref?: string;
    InvestmentDate?: Date;
    CreateDate?: Date;
    CreateUserId?: string;
    ModifyDate?: Date;
    ModifyUserId?: string;
    StatusId: number;
    Status?: string;
    ClientId?: string;
    bankId?: number;
    DaysNow?: number;
}
 
    export interface InvestmentDocument {
        InvestmentId?: string;
        ClientId?: string;
        Amount?: string;
        Profit?: string;
        Total?: string;
        Name?: string;
        Type?: string;
        InvestmentDate?: string;
        CreateDate?: any;
        CreateUserId?: any;
        ModifyDate?: any;
        ModifyUserId?: any;
        StatusId?: any;
        DocumentId?: any;
        DocumentCode?: any;
        DocumentName?: any;
        DocumentUrl?: any;
        Status?: string;
        UploadedDate?: any;
        DocStatus?: string;
    }
  
