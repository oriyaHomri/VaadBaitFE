import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Expenses } from '../classes/Expenses';
import { ExpensesAdd } from '../classes/ExpensesAdd';

// import { baseURL } from '../../environments/environment';
const baseURL = 'https://localhost:44334/api/';
@Injectable
  ({
    providedIn: 'root'
  })
export class ExpensesService {

  constructor(public http: HttpClient) { }
  AddExpenses(c: ExpensesAdd) {
    this.http.post(baseURL + 'addExpenses',c).subscribe() ;
     // return <number><unknown>this.getId();
}
getAllExpenses(): Observable<Expenses[]> {
 return this.http.get<Expenses[]>(baseURL + 'getAllExpenses');

}

removeExpenses(id: number) {
     this.http.delete(baseURL + 'removeExpenses/' + id).subscribe(
    );
  }
  update(n: Expenses) {
    this.http.put(baseURL + 'updateExpenses', n).subscribe();
  }
 
}
