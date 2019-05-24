export interface LoginProcess {
    showLogin: boolean;
    showResetPass: boolean;
    showOverlay: boolean;
    showEmailNotification: boolean;
    message: string;
}

export const newLoginProcess: LoginProcess = {
    showLogin: false,
    showResetPass: false,
    showOverlay: false,
    showEmailNotification: false,
    message: null
}