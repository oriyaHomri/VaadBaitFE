import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
registerLocaleData(localeES, "es");
import { formatDate } from "@angular/common";

@Pipe({
  name: 'filter2',
})
/*
*/
export class FilterPipe2 implements PipeTransform {
 

  transform(value: any[], searchText?: string,): any {

    if(!searchText||value==null) return value;
    var res = [];
    value.forEach(element => {
      if (element != null) {
        const locale = 'en-US';
const formattedDate = formatDate(element.Date1, "yyyy-MM", locale);
       

        

        if (formattedDate==searchText) {
          res.push(element);
        }
      }
    });

    return res;
  }

}
