import { Component, OnInit } from '@angular/core'
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'
import { utils as XLSXUtils, writeFile } from 'xlsx'
import { WorkBook, WorkSheet } from 'xlsx/types'
import { Insertions } from 'src/app/classes/Insertions'
import { InsertionsService } from 'src/app/service/Insertions.service'
import { jsPDF } from 'jspdf'
import { TenantsSevice } from 'src/app/service/Tenants.service'
import { Tenants } from 'src/app/classes/Tenants'
import { Expenses } from 'src/app/classes/Expenses'
import { ExpensesService } from 'src/app/service/Expenses.service'
import { Dictionary } from 'src/app/classes/Dictionary'
@Component({
  selector: 'app-ManageInt',
  templateUrl: './ManageInt.component.html',
  styleUrls: ['./ManageInt.component.css'],
})
export class ManageIntComponent implements OnInit {
  year: number
  TenantsFilter
  TenantsFilterList: Array<Tenants> = []
  insertFilterList: Array<Insertions> = []
  search: ''
  head = [
    ['שם הדייר', 'ת"ז הדייר', ' סכום תשלום', 'תאריך תשלום', 'סיבת תשלום '],
  ]
  head2 = [['סכום הוצאה', 'תאריך הוצאה', 'סיבת הוצאה']]
  dataForPDF = []
  insert: boolean = false
  ex: boolean = true
  dic: []
  all: number = 0
  allIn = 0
  dictionary: Array<Expenses> = []
  InsertionsList: Array<Insertions> = []
  TenantsList: Array<Tenants> = []
  b: boolean = false
  allT: boolean = false
  num: Array<Dictionary> = []
  data_cart = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  options = {
    responsive: true,
    maintainAspectRatio: false,
  }
  type = 'pie'
  constructor(
    public service: InsertionsService,
    public server: TenantsSevice,
    public ser: ExpensesService,
  ) {}
  getInsertionsByTenants() {
    if (this.TenantsFilter !== 'כל הדיירים') {
      var t = new Tenants()
      t = this.TenantsFilter
      var i = 0
      this.insertFilterList = []
      this.InsertionsList.filter((e) => {
        if (e.TenantId == t) {
          //if(this.insertFilterList.includes(e)==false)
          this.insertFilterList.push(e)
        }
        i++
      })
      // this.TenantsFilterList = this.TenantsList.filter(
      //  item => item.TenantCode === this.TenantsFilter.TenantCode// לבדוק איך מקבלים את הערך שנבחר בדדל
      // );

      // this.TenantsFilterList.forEach(element => {

      //});

      this.b = true
    } else {
      //this.TenantsFilterList = this.TenantsList;
      this.insertFilterList = this.InsertionsList
    }
    // var i=0;
    // this.getAllInsertions()

    //this.TenantsFilterList=this.TenantsList

    // if(this.insertFilterList.length==0){this.d==true}
  }
  //   () {
  //  this.getAllInsertions();
  //    this.InsertionsList=this.InsertionsList.filter(
  //      (e)=>
  //      { e.TenantId==this.TenantsFilter}
  //     )

  //     //this.service.getInsertionsByTenants(this.year).subscribe((res)=>{this.dictionary=res;});
  //   }
  f() {
    this.allT = false
    if (this.insert == true) this.insert = false
    else this.insert = true
    if (this.b == true) this.b = false
  }
  f1() {
    this.ex = !this.ex
  }
  f2() {
    if (this.allT == false) this.allT = true
    //else { this.allT = false }
  }
  private dataConvertdictionary() {
    this.dataForPDF = this.dictionary.map(({ Date1 }) => ({
      'תאריך ההוצאה ': Date1,
    }))
    for (let i = 0; i < this.dictionary.length; i++) {
      this.dataForPDF[i]['סכום הוצאה'] = this.dictionary[i].Amount
      //  this.dataForPDF[i]['תאריך הוצאה'] = this.dictionary[i].Date1;
      this.dataForPDF[i]['סיבת הוצאה'] = this.dictionary[i].Details
    }
    return this.dataForPDF
  }
  print() {
    window.print()
  }
  ngOnInit() {
    this.getAllTennats()
    this.getAllExpenses()
    this.TenantsFilter = ''
  }
  getAllExpenses() {
    this.ser.getAllExpenses().subscribe((d) =>
     {
      this.dictionary = d
      this.dictionary.forEach((element) => {
        var a = 0
        a = Number(element.Amount)
        this.all += a
        var dic :Dictionary={Name:element.Details,Num:0}
        this.num.push(dic)
      }
      )
      this.num=  Array.from(this.num.reduce((m, t) => m.set(t.Name, t), new Map()).values())
      
      this.dictionary.forEach((element) => {
        let a: number = 0
        a = Number(element.Amount)
        var res:Dictionary = this.num.find(el => el.Name ==element.Details );
        res.Num += a
        
      })
      this.num= this.num.sort((a,b)=>{
        return a.Num -b.Num
      })
      this.num.forEach((e) => {
        let numb = []
        this.data_cart.labels[this.data_cart.labels.length] = e.Name
        numb.push(e.Num)
        this.data_cart.datasets[0].data[this.data_cart.datasets[0].data.length] = numb
      })
      console.log(this.data_cart.labels)
      console.log(this.data_cart.datasets[0].data)
    })
 
  }
  private getAllTennats() {
    this.server.getAllTenants().subscribe((data) => {
      this.TenantsList = data
      // this.TenantsFilterList=data;
    })
  }

  
  sortData() {
    this.dictionary = this.dictionary.sort((a, b) => {
      return <any>new Date(b.Date1) - <any>new Date(a.Date1)
    })
  }
  sort() {
    this.getAllExpenses()
  }

 
}
