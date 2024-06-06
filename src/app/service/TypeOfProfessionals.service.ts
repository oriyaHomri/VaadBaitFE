import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { TypeOfProfessionals } from '../classes/TypeOfProfessionals';

//import { baseURL } from '../../environments/environment';
const baseURL = 'https://localhost:44334/api/';
@Injectable
  ({
    providedIn: 'root'
  })
export class TypeOfProfessionalsService {

  constructor(public http: HttpClient) { }
  AddTypeOfProfessional(c: TypeOfProfessionals) {
    this.http.post(baseURL + 'addTypeOfProfessionals',c).subscribe() ;

}
getAllTypeOfProfessional(): Observable<TypeOfProfessionals[]> {
 return this.http.get<TypeOfProfessionals[]>(baseURL + 'getAllTypeOfProfessionals');

}
removeTypeOfProfessional(id: number) {
     this.http.delete(baseURL + 'removeTypeOfProfessionals/' + id).subscribe(
    );
  }
  
 
}
