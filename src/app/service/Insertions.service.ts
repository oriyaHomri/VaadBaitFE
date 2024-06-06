import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Insertions } from '../classes/Insertions';
 import { baseURL } from '../../environments/environment';
import { InsertionsAdd } from '../classes/InsertionsAdd';
//const baseURL = 'https://localhost:44334/api/';
@Injectable
  ({
    providedIn: 'root'
  })
export class InsertionsService {
  getInsertionsByTenants(idTenants: number): Observable<Insertions[]> {
    return this.http.get<Insertions[]>(baseURL + 'getInsertionsByTenants/'+idTenants)
  }

  constructor(public http: HttpClient) { }
  AddInsertions(c: InsertionsAdd) {
    this.http.post(baseURL + 'addInsertions',c).subscribe() ;

}
getAllInsertions(): Observable<Insertions[]> {
 return this.http.get<Insertions[]>(baseURL + 'getAllInsertions');

}
getInsertionsByYearOrderTenants(year:number): Observable<Insertions[]> {
  return this.http.get<Insertions[]>(baseURL + 'getInsertionsByYearOrderTenants/'+year)
 }
removeInsertions(id: number) {
     this.http.delete(baseURL + 'removeInsertions/' + id).subscribe(
    );
  }
  update(n: Insertions) {
    this.http.put(baseURL + 'updateInsertions', n).subscribe();
  }
 
}
