import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter3',
})
/*
*/
export class FilterPipe3 implements PipeTransform {

  transform(value: any[], searchText?: string,): any {

    if(!searchText||value==null) return value;
    var res = [];
    value.forEach(element => {
      if (element != null) {
        if (element.TypeOfProfessional.TypeOfProfessional.indexOf(searchText) > -1) {
          res.push(element);
        }
      }
    });

    return res;
  }

}
