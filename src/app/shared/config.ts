export const IS_LOCAL = true;
let api = 'http://citgo.ndu-systems.net/api';
let web = 'http://citgo.ndu-systems.net';
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

export function getCurrentUser(){
    return 'ndu';
}

export const VERIFICATIONLINK = "etr70554f35IG6767-ctrl789954";
export const REFERALLINK = "has70554f35uyt6767-ctrl874554";

export const SEND_ACC_VERIFICATION_EMAIL= 'http://citgo.ndu-systems.net/api/email/email-acc-verify.php';