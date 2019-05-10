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

export const MONTHS_MAP = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']