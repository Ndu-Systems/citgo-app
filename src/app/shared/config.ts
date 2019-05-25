export const IS_LOCAL = true;
let api = 'https://citgoafrica.com/api';
let web = 'https://citgoafrica.com/';
if (IS_LOCAL) {
    api = 'http://localhost:8080/citgo-php-api';
    web = 'http://localhost:4200';
}

export const   API_URL = api;
export const WEB_HOST = web;
export const LAST_INSERT_ID = 'LAST_INSERT_ID';
export const CURRENT_USER = 'currentUser';
export const  ADMIN_USER_ROLE =1;
export const  CLIENT_USER_ROLE =2;
export const  STATUS_USER_NEW =4;
export const  STATUS_USER_ACTIVE =3;
export const DEFAULT_PASSWORD= "pass@123!";

export function getCurrentUser(){
    return 'ndu';
}

export const VERIFICATIONLINK = "etr70554f35IG6767-ctrl789954";
export const RESET_PASSWORD = "e23587411e523332s33111a33333ds1";
export const REFERALLINK = "sign-up-from-link";

const onlineApi = "https://citgoafrica.com/api";
export const SEND_ACC_VERIFICATION_EMAIL = `${onlineApi}/email/email-acc-verify.php`;
export const SEND_FORGOT_PASSWORD_EMAIL = `${onlineApi}/email/email-reset-password.php`;


// Validator

export const PASSWORD_DONT_MATCH_ERROR = 'Your password(s) do not match';
export const OLD_PASSWORD_DONT_MATCH_ERROR = 'Your old password(s) do not match';
export const PASSWORD_EXISTS_ERROR = 'Your password cannot be something familiar to us';

export const UPDATE_CLIENT_ERROR = 'Something went wrong please try again later.';
