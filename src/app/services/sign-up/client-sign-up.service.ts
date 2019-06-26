import { Beneficiary } from 'src/app/models/beneficiaty.model';
import { Bank } from './../../models/bank.model';
import { Client } from './../../models/client.model';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ClientSignUpService {
  private dataStore: {
    user: User,
    client:Client,
    bank:Bank,
    beneficiaries:Beneficiary[]
  };
constructor() { }

}
