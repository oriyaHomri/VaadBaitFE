import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Frequencies } from '../classes/Frequencies';
import { FrequenciesAdd } from '../classes/FrequenciesAdd';

// import { baseURL } from '../../environments/environment';
const baseURL = 'https://localhost:44334/api/';
@Injectable
  ({
    providedIn: 'root'
  })
export class FrequenciesService {

  constructor(public http: HttpClient) { }
  AddFrequencies(c: FrequenciesAdd) {
    this.http.post(baseURL + 'addFrequencies',c).subscribe() ;

}
getAllFrequencies(): Observable<Frequencies[]> {
 return this.http.get<Frequencies[]>(baseURL + 'getAllFrequencies');

}
removeFrequencies(id: number) {
     this.http.delete(baseURL + 'removeFrequencies/' + id).subscribe(
    );
  }
  update(n: Frequencies) {
    
    this.http.put(baseURL + 'updateFrequencies', n).subscribe(d=>console.log(d));
  }
 
}
