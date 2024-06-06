import { Component, OnInit } from '@angular/core';
import { Expenses } from 'src/app/classes/Expenses';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpensesService } from 'src/app/service/Expenses.service';
import { ExpensesAdd } from 'src/app/classes/ExpensesAdd';
import { FrequencyObject } from 'src/app/classes/FrequencyObject';
import { FrequencyObjectService } from 'src/app/service/FrequencyObject.service';
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'
import { utils as XLSXUtils, writeFile } from 'xlsx'
import { WorkBook, WorkSheet } from 'xlsx/types'
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-Expenses',
  templateUrl: './Expenses.component.html',
  styleUrls: ['./Expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm;
  @ViewChild('divS') divHtml: ElementRef;
  @ViewChild('signupFormtype') formType: NgForm;

  bool: boolean = false;
  constructor(private server: ExpensesService,public service:FrequencyObjectService) {
    this.Expenses = new ExpensesAdd();
    this.FrequencyObject=new FrequencyObject();
  }
  Expenses: ExpensesAdd;
  all: number = 0
  search: Date;
  ExpensesList: Array<Expenses> = [];
  id: number;
  head = [['שם הדייר', 'ת"ז הדייר', ' סכום תשלום', 'תאריך תשלום', 'סיבת תשלום ']];
  dataForPDF = [];
  //InsertionsList: Array<Insertions>=[];
  FrequencyObject: FrequencyObject;
  searchFrequencyObject: '';
  FrequencyObjectList: FrequencyObject[] = [];
  ngOnInit() {
this.getAllFrequencyObject();
    this.getAllExpenses();

  }
  private getAllExpenses() {
    this.server.getAllExpenses().subscribe(data => {
      this.ExpensesList = data;
      this.ExpensesList.forEach(element => {
        var a = 0
        a = Number(element.Amount);
        this.all += a
       
            var e = this.FrequencyObjectList.filter(
              e => e.FrequencyObjects == <string><unknown>element.Details)[0];
            element.Details = e.FrequencyObjects;
          });
        });
      };
    

    //this.ExpensesList.sort(e=>e.Date1)
 
  public get sortData() {
    return this.ExpensesList.sort((a, b) => {
       return (<any>new Date(b.Date1) - <any>new Date(a.Date1));
    });
  }
  onSubmitForm() {
  
    this.server.AddExpenses(this.Expenses);
    this.form.reset();
   
    this.ExpensesList.push();
    this.getAllExpenses();
  }
  Delete(n: Expenses) {
    if (confirm('האם ברצונך למחוק את הכיתה ' + n.IdExpense + '?')) {
      this.server.removeExpenses(n.IdExpense);
      
      // var i=this.ExpensesList.indexOf(n);
      // this.ExpensesList.splice(i)
      this.getAllExpenses();
    }
  }
  update(n) {
    if (this.Expenses.Amount !== '') {
      n.Details = this.Expenses.Details;
      n.Amount = this.Expenses.Amount;
      this.server.update(n);
      this.getAllExpenses()
    }
    else { this.bool = true }
  }
  private getAllFrequencyObject() {
    this.service.getAllFrequencyObject().subscribe(data => {
      this.FrequencyObjectList = data;
      console.log(this.FrequencyObjectList)
    });
  }
  onSubmitFormFrequencyObject() {
    this.service.AddFrequencyObject(this.FrequencyObject);
    this.formType.reset();
      this.getAllFrequencyObject()
  }
  
 
  createPdf() {
    const data = document.getElementById('contentToConvert') // Id of the table
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      debugger
      const imgWidth = 208
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const heightLeft = imgHeight

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4') // A4 size page of PDF
      const position = 0
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      // pdf.output('dataurlnewwindow');
      pdf.save('Report.pdf') // Generated PDF
    })
  }
  
  createPdfdictionary() {
    const data = document.getElementById('contentToConvert1') // Id of the table
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      debugger
      const imgWidth = 208
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const heightLeft = imgHeight

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4') // A4 size page of PDF
      const position = 0
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      // pdf.output('dataurlnewwindow');
      pdf.save('Report.pdf') // Generated PDF
    })
  }
    creatExceldictionary() {
    let fileExtension = '.xlsx'
    let fileName = 'report'
    let sheetName: string = 'שנה'

    const ws: WorkSheet = XLSXUtils.json_to_sheet(this.dataConvertdictionary())
    const wb = XLSXUtils.book_new()
    XLSXUtils.book_append_sheet(wb, ws, sheetName)

    XLSX.writeFile(wb, `${fileName}${fileExtension}`)
  }
  private dataConvertdictionary() {
    this.dataForPDF = this.ExpensesList.map(({ Date1 }) => ({
      'תאריך ההוצאה ': Date1,
    }))
    for (let i = 0; i < this.ExpensesList.length; i++) {
      this.dataForPDF[i]['סכום הוצאה'] = this.ExpensesList[i].Amount
      //  this.dataForPDF[i]['תאריך הוצאה'] = this.dictionary[i].Date1;
      this.dataForPDF[i]['סיבת הוצאה'] = this.ExpensesList[i].Details
    }
    return this.dataForPDF
  }
  print() {
    window.print()
  }
}

