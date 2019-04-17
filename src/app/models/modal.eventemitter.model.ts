export interface CloseModalEventEmmiter{
    showPersonalInfoForm:boolean;
    showBankingInfoForm:boolean;
    showBenefitariesForm:boolean;
    closeAll:boolean;  
    
    // optional for confirm box
    closeConfirm?:boolean;  
    actionConfirmed?:boolean;  


}

export interface ExitModalEventEmmiter{
    close: boolean;
};

