export interface LoginProcess{
    showLogin:boolean;
    showResetPass:boolean;
    showOverlay:boolean;
}

export const newLoginProcess: LoginProcess = {
    showLogin:false,
    showResetPass:false,
    showOverlay:false
}