import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient} from '@angular/common/http';
// import { baseURL } from '../../environments/environment';
import { Tenants } from '../classes/Tenants';
import { sendEmail } from '../classes/sendEmail';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
const baseURL = 'https://localhost:44334/api/';
@Injectable
({
    providedIn: 'root'
})
  export class TenantsSevice {

   constructor(public http: HttpClient) {}

   AddTenants(c: Tenants) {
       this.http.post(baseURL + 'addTenants',c).subscribe() ;

  }
  getAllTenants(): Observable<Tenants[]> {
    return this.http.get<Tenants[]>(baseURL + 'getAllTenants');

  }
  removeTenants(id: number) {
      this.http.delete(baseURL + 'removeTenants/' + id).subscribe();
         
}update(n: Tenants) {
 
  this.http.put(baseURL + 'updateTenants', n).subscribe(()=>alert("הפרטים התעדכנו"));
}
sendEmailForTenats(sendEmail:sendEmail)
{
this.http.put(baseURL + 'sendEmailTenants',sendEmail).subscribe();
}
}
