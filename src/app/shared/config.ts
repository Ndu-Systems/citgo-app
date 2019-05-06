export const IS_LOCAL = false;
let api = 'http://citgo.ndu-systems.net/api';
let web = 'http://citgo.ndu-systems.net';
if (IS_LOCAL) {
    api = 'http://localhost:8080/citgo-php-api';
    web = 'http://localhost:4200';
}

export const   API_URL = api;
export const WEB_HOST = web;
export const LAST_INSERT_ID = 'LAST_INSERT_ID';

export function getCurrentUser(){
    return 'ndu';
}