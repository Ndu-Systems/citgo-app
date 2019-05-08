import { Injectable } from '@angular/core';
import { Investment } from 'src/app/models';

import { API_URL } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  url = API_URL;
  constructor(private httpClient: HttpClient) { }

  getAllInvestements()  {
    return this.httpClient.get<any>(
      `${this.url}/api/investments/get.php`
    );
  }
}


