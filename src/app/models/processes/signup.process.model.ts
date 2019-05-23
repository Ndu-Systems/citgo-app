import { User } from 'src/app/models/user';
import { CloseModalEventEmmiter, initModalEvent } from '..';

export interface SignUpProcess{
    showVerificationMailSent:boolean;
    user:User;
    whichModalToShow:CloseModalEventEmmiter
}

export const newProcess: SignUpProcess = {
    showVerificationMailSent:true,
    user:null,
    whichModalToShow:initModalEvent
}
