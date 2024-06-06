import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Professionals } from '../classes/Professionals';
import { ProfessionalsAdd } from '../classes/ProfessionalsAdd';
import { sendEmail } from '../classes/sendEmail';

// import { baseURL } from '../../environments/environment';
const baseURL = 'https://localhost:44334/api/';
@Injectable
  ({
    providedIn: 'root'
  })
export class ProfessionalsService {
  
  

  constructor(public http: HttpClient) { }
  sendEmailForProf(sendEmail:sendEmail) {
    this.http.put(baseURL + 'sendEmailTenants',sendEmail).subscribe() ;
}
  AddProfessionals(c: ProfessionalsAdd) {
    this.http.post(baseURL + 'addProfessionals',c).subscribe() ;
}
getAllProfessionals(): Observable<Professionals[]> {
 return this.http.get<Professionals[]>(baseURL + 'getAllProfessionals');

}
removeProfessionals(id: number) {
     this.http.delete(baseURL + 'removeProfessionals/' + id).subscribe(
    );
  }
  update(n: Professionals) {
    this.http.put(baseURL + 'updateProfessionals', n).subscribe();
  }
 
}
