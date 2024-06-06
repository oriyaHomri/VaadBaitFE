import { Component, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
// import { FrequencyObject } from 'src/app/classes/FrequencyObject';
import { TenantsSevice } from 'src/app/service/Tenants.service';
import { Tenants } from 'src/app/classes/Tenants';
import { HttpHeaders } from '@angular/common/http';
import { sendEmail } from 'src/app/classes/sendEmail';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-Tenants',
  templateUrl: './Tenants.component.html',
  styleUrls: ['./Tenants.component.css']
})
export class TenantsComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm;
  @ViewChild('divS') divHtml: ElementRef;
  b:boolean=false;
  ifSenddToAll:boolean=false
  sendE: sendEmail;
  Tenants: Tenants;
  search: '';
  TenantsList: Array<Tenants> = [];
  bool: boolean = false;
  constructor(private server: TenantsSevice,public  dialog: MatDialog) {
    this.Tenants = new Tenants();
    this.sendE=new sendEmail();
  }
  ngOnInit() {
    this.getAllTenants();
  }
  getAllTenants() {
    this.server.getAllTenants().subscribe(data => {
      this.TenantsList = data;
      console.log(data);
    });
  }
  onSubmitForm() {
    
    this.server.AddTenants(this.Tenants);
    this.form.reset();
    this.getAllTenants()
    this.getAllTenants()
  }
  Delete(n: Tenants) {
    if (confirm('האם ברצונך למחוק את הדייר ' + n.LastName + '?')){
      this.server.removeTenants(n.TenantCode);
      this.getAllTenants();
      this.getAllTenants()
    }
  }
  sendEmail(t:Tenants)
  {
    this.sendE.address=t.EMail;
    this.b=true;
  }
  sendEmailForTenats()
  {
    if(this.ifSenddToAll==false)
    this.server.sendEmailForTenats(this.sendE);
    else
    { this.TenantsList.forEach(e => {
      this.sendE.address=e.EMail;
      this.server.sendEmailForTenats(this.sendE);
      })
      this.ifSenddToAll=true;
    }
  }
  sendEmailForAllTenats() {
   this.ifSenddToAll=true;
   this.b=true
  }
  update(n: Tenants) {
    if (this.Tenants.EMail !== ''
    ||this.Tenants.FirstName!== ''
    ||this.Tenants.LastName!== ''
    ||this.Tenants.Floor!== 0
    ||(this.Tenants.Floor== 0&&n.Floor!==0)
    ||this.Tenants.NumOfApartment!== 0
    ||(this.Tenants.NumOfApartment== 0&&n.NumOfApartment!==0)
    ) {
      n.EMail = this.Tenants.EMail;
      n.FirstName=this.Tenants.FirstName;
      n.LastName=this.Tenants.LastName;
      n.NumOfApartment=this.Tenants.NumOfApartment;
      n.Floor=this.Tenants.Floor
      //  n.EMail = this.Tenants.EMail;  
      this.server.update(n);
      
    }
    else { this.bool = true }

  }
}
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}