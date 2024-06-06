import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/classes/Tasks';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksSevice } from 'src/app/service/Tasks.service';
import { TypeOfTaskservice } from 'src/app/service/TypeOfTasks.service';
import { TypeOfTasks } from 'src/app/classes/TypeOfTasks';
import { TasksAdd } from 'src/app/classes/TasksAdd';
import { Expenses } from 'src/app/classes/Expenses';
import { Frequencies } from 'src/app/classes/Frequencies';
import { Professionals } from 'src/app/classes/Professionals';
import { FrequenciesService } from 'src/app/service/Frequencies.service';
import { ExpensesService } from 'src/app/service/Expenses.service';
import { ProfessionalsService } from 'src/app/service/Professionals.service';
import { ExpensesAdd } from 'src/app/classes/ExpensesAdd';
import { TasksAddE } from 'src/app/classes/TasksAddE';
import { FrequencyObjectService } from 'src/app/service/FrequencyObject.service';
import { FrequencyObject } from 'src/app/classes/FrequencyObject';

@Component({
  selector: 'app-Tasks',
  templateUrl: './Tasks.component.html',
  styleUrls: ['./Tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm;
  @ViewChild('divS') divHtml: ElementRef;
 
  constructor(private server: TasksSevice,
    private service: FrequenciesService, private serviceExpenses: ExpensesService, public serviceType: TypeOfTaskservice,
    private serviceProfessionals: ProfessionalsService, private ser:FrequencyObjectService) {
    this.Tasks = new TasksAddE();
    this.TasksA=new TasksAdd();
  }
  FrequencyObjectList:Array<FrequencyObject>=[];
  Tasks: TasksAddE;
  TasksA: TasksAdd;
  typesTasks: Array<TypeOfTasks> = []
  search: '';
  color: string;
  TasksList: Array<Tasks> = [];
  TypeOfTasks: TypeOfTasks;
  searchTypeOfTasks: '';
  bool: boolean = false;
  FrequenciesList: Array<Frequencies> = []
  FrequenciesFilterList: Array<Frequencies> = []
  ExpensesList: Array<Expenses> = []
  ProfessionalsList: Array<Professionals> = []
  ngOnInit() {
    this.getAllProfessionals();
    this.getAllFrequencies();
    this.getAllExpenses();
    this.getAllTypeTasks();
    this.getAllTasks();
    this.getAllFO();
    
  }
  getAllTypeTasks() {
    this.serviceType.getAllTypeOfTasks().subscribe(data => {
      this.typesTasks = data;
    });
  } getAllFO() {

    this.ser.getAllFrequencyObject().subscribe(data => {
      this.FrequencyObjectList = data;
    });
  }
  private getAllTasks() {
    this.server.getAllTasks().subscribe(data => {
      this.TasksList = data;
      this.TasksList.forEach(element => {
        var e = this.ProfessionalsList.filter(ep => ep.ProfessionalsCode == <number><unknown>element.FixedBy)[0];
        var e1 = this.FrequenciesList.filter(ef =>
        ef.FrequenciesCode == <number><unknown>element.IdFrequency)[0]
        // var t= this.typesTasks.filter(t => t.IdTypeOfTasks == <number><unknown>e1.FrequencyType1)[0]
        // e1.FrequencyType1=t;
        var e2 = this.ExpensesList.filter(ef => ef.IdExpense == <number><unknown>element.IdExpense)[0]
        element.FixedBy = e;
        element.IdFrequency = e1;
        element.IdExpense = e2;
        element.Date1
      })
    })
  }
  private getAllProfessionals() {
    this.serviceProfessionals.getAllProfessionals().subscribe(data => {
      this.ProfessionalsList = data
    })
  }
  private getAllFrequencies() {
    this.service.getAllFrequencies().subscribe(data => {
    
      this.FrequenciesList = data
      this.FrequenciesList.filter(e=> 
        {
          if(e.Fixed1==false)
          
          this.FrequenciesFilterList.push(e)
        }
     );
    })
  //   
   
   //this.FrequenciesList=a;
  }
  private getAllExpenses() {
    this.serviceExpenses.getAllExpenses().subscribe(data => {
      this.ExpensesList = data
    })
  }
  onSubmitForm() {
   var e =new ExpensesAdd();
   e.Amount=<string><unknown>this.Tasks.Amount;
    e.Date1=new Date();
    e.Details=this.Tasks.Details;
     this.serviceExpenses.AddExpenses(e);
     var g = new TasksAdd();
     g.Description=<string><unknown>this.Tasks.Details;
     g.Date1=this.Tasks.Date1;
     g.FixeDate=this.Tasks.FixeDate;
     g.FixedBy=this.Tasks.FixedBy;
     g.TypeOfTask=this.Tasks.TypeOfTask;
  
    this.server.AddTasks(g);
    
    // 
    this.form.reset();
    this.getAllTasks()

  }
  f(){  }
  // f(a:Frequencies){
  //   this.service.update(a);}
  Delete(n: Tasks) {
    if (confirm('האם ברצונך למחוק את הכיתה ' + n.IdTask + '?')) {
      this.server.removeTasks(n.IdTask);
      this.TasksList.splice(n.IdTask);
      this.getAllTasks();
    }

  }

  update(n: Tasks) {
    if (this.Tasks.Description !== '') {
      n.Description = this.Tasks.Description;
      n.FixeDate = this.Tasks.FixeDate;
      this.server.update(n);
      this.getAllTasks();
    } else { this.bool=true }
  }
}
