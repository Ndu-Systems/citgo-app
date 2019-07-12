
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search_share'
})
export class SearchSharePipe implements PipeTransform {

  transform(shares: any[], val:string): any {
    console.log(shares);
    console.log(val);
    
    if(!val) return shares;
    if(!shares) return null
    
    return shares.filter(x=>x.ClientName.toLocaleLowerCase().includes(val.toLocaleLowerCase()));
  }

}
