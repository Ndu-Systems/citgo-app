// import { User } from './../../../models/user';
import { Investment } from 'src/app/models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search_share'
})
export class SearchSharePipe implements PipeTransform {

  transform(shares: any[], val: string): any {

    if (!val) { return shares; }
    if (!shares) { return null; }

    return shares.filter(x => x.ClientName.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
  }

}
