import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'search_clients'
})
export class SearchClientsPipe implements PipeTransform {

  transform(clients: User[], val: string): any {

    if (!val) { return clients; }
    if (!clients) { return null; }

    return clients.filter(x =>
     x.FirstName.toLocaleLowerCase().includes(val.toLocaleLowerCase()) ||
     (x.IDNumber || '').includes(val) ||
     (x.Email || '').includes(val) ||
     x.Surname.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
  }

}
