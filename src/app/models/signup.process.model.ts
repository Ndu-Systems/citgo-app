import { User } from 'src/app/models/user';
export interface SignUpProcess{
    isProcessRunning:boolean;
    user:User;
}

export const newProcess: SignUpProcess = {
    isProcessRunning:false,
    user:null
}
