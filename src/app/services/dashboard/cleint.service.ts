import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CleintService {

  url = API_URL;
  
  constructor(private httpClient: HttpClient) {
  }

  getClientById(ClientId) {
    return this.httpClient.get<any>(
      `${this.url}/api/clients/get-client-by-id.php?ClientId=${ClientId}`
    );
  }

}
