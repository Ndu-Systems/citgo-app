import { User } from 'src/app/models/user';
import { CloseModalEventEmmiter, initModalEvent } from '.';

export interface SignUpProcess{
    isProcessRunning:boolean;
    user:User;
    whichModalToShow:CloseModalEventEmmiter
}

export const newProcess: SignUpProcess = {
    isProcessRunning:false,
    user:null,
    whichModalToShow:initModalEvent
}
