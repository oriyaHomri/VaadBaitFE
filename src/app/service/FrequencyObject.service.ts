import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { FrequencyObject } from '../classes/FrequencyObject';

//import { baseURL } from '../../environments/environment';
const baseURL = 'https://localhost:44334/api/';
@Injectable
  ({
    providedIn: 'root'
  })
export class FrequencyObjectService {

  constructor(public http: HttpClient) { }
  AddFrequencyObject(c: FrequencyObject) {debugger;
    this.http.post(baseURL + 'addFrequencyObject',c).subscribe() ;

}
getAllFrequencyObject(): Observable<FrequencyObject[]> {
 return this.http.get<FrequencyObject[]>(baseURL + 'getAllFrequencyObject');

}
removeFrequencyObject(id: number) {
     this.http.delete(baseURL + 'removeFrequencyObject/' + id).subscribe(
    );
  }
  
 
}
