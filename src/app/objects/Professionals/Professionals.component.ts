import { Component, OnInit } from '@angular/core';
import { Professionals } from 'src/app/classes/Professionals';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessionalsService } from 'src/app/service/Professionals.service';
import { TypeOfProfessionalsService } from 'src/app/service/TypeOfProfessionals.service';
import { TypeOfProfessionals } from 'src/app/classes/TypeOfProfessionals';
import { ProfessionalsAdd } from 'src/app/classes/ProfessionalsAdd';
import { sendEmail } from 'src/app/classes/sendEmail';
import { INT_TYPE } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-Professionals',
  templateUrl: './Professionals.component.html',
  styleUrls: ['./Professionals.component.css']
})
export class ProfessionalsComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm;
  @ViewChild('signupFormtype') formType: NgForm;
  @ViewChild('sendEmail') sendEmail: NgForm;
  @ViewChild('divS') divHtml: ElementRef;
  constructor(private server: ProfessionalsService,
    private service: TypeOfProfessionalsService) {
    this.Professional = new ProfessionalsAdd();
    this.TypeOfProfessionals = new TypeOfProfessionals();
    this.sendE = new sendEmail();
  }
  b: boolean = false
  sendE: sendEmail;
  Professional: ProfessionalsAdd;
  search: '';
  bool: boolean = false;
  ProfessionalsList: Array<Professionals> = [];
  TypeOfProfessionals: TypeOfProfessionals;
  searchTypeOfProfessionals: '';
  TypeOfProfessionalsList: TypeOfProfessionals[] = [];
  ngOnInit() {
    this.getAllTypeOfProfessionals();
    this.getAllProfessionals();
  }
  private getAllProfessionals() {
    this.server.getAllProfessionals().subscribe(data => {
      this.ProfessionalsList = data
      this.ProfessionalsList.forEach(element => {
        var e = this.TypeOfProfessionalsList.filter(
          e => e.IdTypeOfProfessionals == <number><unknown>element.TypeOfProfessional)[0];
        element.TypeOfProfessional = e;
      });
    });
  }
  onSubmitForm() {
    this.server.AddProfessionals(this.Professional);
    var a= new Professionals();
    a.FirstName=this.Professional.FirstName;
    a.ProfessionalsCode=3241;
    this.ProfessionalsList.push(a);
    this.form.reset();
    this.getAllProfessionals();
  }
  Delete(n: Professionals) {
    if (confirm('האם ברצונך להפוך את בעל המקצוע ' + n.FirstName + ' ' + n.LastName + ' ללא פעיל?')) {
      this.server.removeProfessionals(n.ProfessionalsCode);
      // syncDelay(5000);
      this.getAllProfessionals();
    }
  }
  private getAllTypeOfProfessionals() {
    this.service.getAllTypeOfProfessional().subscribe(data => {
      this.TypeOfProfessionalsList = data;
    });
  }
  onSubmitFormTypeOfProfessionals() {
    this.service.AddTypeOfProfessional(this.TypeOfProfessionals);
    this.TypeOfProfessionals.IdTypeOfProfessionals=23409;
    this.TypeOfProfessionalsList.push(this.TypeOfProfessionals)
    this.formType.reset();
    this.getAllTypeOfProfessionals();  }
  // DeleteTypeOfProfessionals(n: TypeOfProfessionals) {
  //   if (confirm('האם ברצונך למחוק את הכיתה ' + n.IdTypeOfProfessionals + '?')) {
  //     this.service.removeTypeOfProfessional(n.IdTypeOfProfessionals);
  //     this.getAllTypeOfProfessionals();
  //   }

  // }
  update(n: Professionals) {
    if (this.Professional.EMail !== '') {
      n.EMail = this.Professional.EMail;
      this.server.update(n);
    }
    // else if (this.Professional.Phone !== 0) {
    //   n.Phone = this.Professional.Phone;
    //   this.server.update(n);
    // }
    else { this.bool = true }
  }
  sendEmailForP(n: Professionals) {
    
    this.sendE.address = n.EMail;
    this.b = true;
  }
  sendEmailForPre() {
    this.server.sendEmailForProf(this.sendE);
    this.b = false;
  }
}


