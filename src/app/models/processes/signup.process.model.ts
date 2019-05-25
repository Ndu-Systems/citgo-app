import { User } from 'src/app/models/user';
import { CloseModalEventEmmiter, initModalEvent } from '..';

export interface SignUpProcess {
    showVerificationMailSent: boolean;
    user: User;
    whichModalToShow: CloseModalEventEmmiter;
    parentId?:string;
}

export const newProcess: SignUpProcess = {
    showVerificationMailSent: false,
    user: null,
    whichModalToShow: initModalEvent,
    parentId:''
}
