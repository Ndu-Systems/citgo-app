export interface CloseModalEventEmmiter{
    showPersonalInfoForm:boolean;
    showBankingInfoForm:boolean;
    showBenefitariesForm:boolean;
    closeAll:boolean;  
    showOverlay:boolean;  
}

export const initModalEvent:CloseModalEventEmmiter = {
    showPersonalInfoForm:false,
    showBankingInfoForm:false,
    showBenefitariesForm:false,
    closeAll:false,
    showOverlay:false
}

export interface ExitModalEventEmmiter{
    close: boolean;
};


