import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { TypeOfTasks } from '../classes/TypeOfTasks';

//import { baseURL } from '../../environments/environment';
const baseURL = 'https://localhost:44334/api/';
@Injectable
  ({
    providedIn: 'root'
  })
export class TypeOfTaskservice {

  constructor(public http: HttpClient) { }
  AddTypeOfTasks(c: TypeOfTasks) {
    this.http.post(baseURL + 'addTypeOfTasks',c).subscribe() ;
}
getAllTypeOfTasks(): Observable<TypeOfTasks[]> {
 return this.http.get<TypeOfTasks[]>(baseURL + 'getAllTypeOfTasks');
}
removeTypeOfTasks(id: number) {
     this.http.delete(baseURL + 'removeTypeOfTasks/' + id).subscribe(
    );
  }
  
}
