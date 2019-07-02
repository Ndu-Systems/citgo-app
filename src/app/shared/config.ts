export const IS_LOCAL:boolean = true;
let api = 'https://citgoafrica.com/api';
let web = 'https://citgoafrica.com/';
if (IS_LOCAL) {
    api = 'http://localhost:8080/citgo-php-api';
    web = 'http://localhost:4200';
}

export const API_URL = api;
export const WEB_HOST = web;
export const LAST_INSERT_ID = 'LAST_INSERT_ID';
export const LAST_INSERT_EMAIL = 'LAST_INSERT_ID';
export const REF = 'REF';
export const CURRENT_USER = 'currentUser';
export const ADMIN_USER_ROLE =1;
export const CLIENT_USER_ROLE =2;
export const STATUS_USER_NEW =4;

export const  STATUS_USER_ACTIVE =3;
export const DEFAULT_PASSWORD= "pass@123!";

export function getCurrentUser(){
    return 'ndu';
}

export const VERIFICATIONLINK = "etr70554f35IG6767-ctrl789954";
export const RESET_PASSWORD = "e23587411e523332s33111a33333ds1";
export const UPDATE_CONTACT_INFO = "e23587488969889a33333ds1";
export const REQUEST_NEW_EMAIL_REQUEST= "e23587488969889a33333vc4";
export const REFERALLINK = "sur";

const onlineApi = "https://citgoafrica.com/api";
export const SEND_ACC_VERIFICATION_EMAIL = `${onlineApi}/email/email-acc-verify.php`;
export const SEND_FORGOT_PASSWORD_EMAIL = `${onlineApi}/email/email-reset-password.php`;
export const SEND_UPDATE_CONTACT_DETAILS_EMAIL = `${onlineApi}/email/email-update-email.php`;
export const SEND_NEW_EMAIL_REQUEST_EMAIL = `${onlineApi}/email/new-email-request-email.php`;
export const SEND_ENQUIRY = `${onlineApi}/email/enquire.php`;


// Validator

//share status
export const SHARE_ACTIVE =1;
export const SHARE_PENDING=2;
export const SHARE_PENDING_VERFICATION=3;
export const SHARE_DECLINED=4;
export const SHARE_REMOVED=5;
export const WITHDRAWABLE='WITHDRAWABLE';
export const REMBERPASSWORD='REMBERPASSWORD';


export const PASSWORD_DONT_MATCH_ERROR = 'Your password(s) do not match';
export const OLD_PASSWORD_DONT_MATCH_ERROR = 'Your old password(s) do not match';
export const PASSWORD_EXISTS_ERROR = 'Your password cannot be something familiar to us';

export const UPDATE_CLIENT_ERROR = 'Something went wrong please try again later.';

// bonus
export const  BONUS_PERCENT = 0.05;
export const  DAILY_GROWTH = (15/30)/100;

