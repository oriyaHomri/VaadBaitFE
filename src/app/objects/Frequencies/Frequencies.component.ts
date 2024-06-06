import { Component, OnInit } from '@angular/core';
import { Frequencies } from 'src/app/classes/Frequencies';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FrequenciesService } from 'src/app/service/Frequencies.service';
import { TypeOfTasks } from 'src/app/classes/TypeOfTasks';
import { TypeOfTaskservice } from 'src/app/service/TypeOfTasks.service';
import { FrequenciesAdd } from 'src/app/classes/FrequenciesAdd';

@Component({
  selector: 'app-Frequencies',
  templateUrl: './Frequencies.component.html',
  styleUrls: ['./Frequencies.component.css']
})
export class FrequenciesComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm;
  @ViewChild('signupFormtype') formType: NgForm;
  @ViewChild('divS') divHtml: ElementRef; 
   @ViewChild('div') div: ElementRef;
  constructor(private server: FrequenciesService,
    private service:TypeOfTaskservice) {
    this.Frequencies = new FrequenciesAdd();
    this.TypeOfTasks=new TypeOfTasks();
  }
  Frequencies: FrequenciesAdd;
  search: '';
  bool:boolean=false;
  TypeOfTasks:TypeOfTasks;
  FrequenciesList: Array<Frequencies> = [];
  TypeOfTasksList:Array<TypeOfTasks>=[];
    ngOnInit() { 
    this.getAllTypeOfTasks();
    this.getAllFrequencies();
    }
  private getAllFrequencies() {
    this.server.getAllFrequencies().subscribe(data => {
      this.FrequenciesList = data;
      this.FrequenciesList.forEach(element => {
        var e = this.TypeOfTasksList.filter(
          e => e.IdTypeOfTasks == <number><unknown>element.FrequencyType1)[0];
        element.FrequencyType1 = e;
      });
    });
  }
  openURL()
  {
    window.open("http://localhost:4200/Tasks", "_blank");
    
  }
  onSubmitForm() {
    this.server.AddFrequencies(this.Frequencies);
    this.form.reset();
this.getAllFrequencies()
  }
  Delete(n: Frequencies) {
    if (confirm('האם ברצונך למחוק את הכיתה ' + n.FrequenciesCode + '?')) {
      // this.server.removeFrequencies(n);
      this.getAllFrequencies();
    }
  }
  private getAllTypeOfTasks() {
    this.service.getAllTypeOfTasks().subscribe(data => {
      this.TypeOfTasksList = data;
    });
  }

  onSubmitFormTypeOfTasks() {
    this.service.AddTypeOfTasks(this.TypeOfTasks);
    this.formType.reset();
this.getAllTypeOfTasks()
  }
//   DeleteTypeOfTasks(n: TypeOfTasks) {
//     if (confirm('האם ברצונך למחוק את הכיתה ' + n.IdTypeOfTasks + '?')) {
//       this.service.removeTypeOfTasks(n.IdTypeOfTasks);
//       this.getAllTypeOfTasks();
//     }
// this.getAllTypeOfTasks()
//   }
  update(n) {
    // if (this.Frequencies !== '') {
    //   n.Amount = this.Frequencies.Amount;
    //         this.server.update(n);
    // } 
    //else { this.bool=true }
  }
}
