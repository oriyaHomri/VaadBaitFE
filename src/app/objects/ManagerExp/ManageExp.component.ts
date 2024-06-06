import { Component, OnInit } from '@angular/core'
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import { Insertions } from 'src/app/classes/Insertions'
import { InsertionsService } from 'src/app/service/Insertions.service'
import { TenantsSevice } from 'src/app/service/Tenants.service'
import { Tenants } from 'src/app/classes/Tenants'

import { Dictionary } from 'src/app/classes/Dictionary'
@Component({
  selector: 'app-ManageExp',
  templateUrl: './ManageExp.component.html',
  styleUrls: ['./ManageExp.component.css'],
})
export class ManageExpComponent implements OnInit {
 
  
  all = 0
  allIn = 0
  InsertionsList: Array<Insertions> = []
  TenantsList: Array<Tenants> = []
  b: boolean = false
  allT: boolean = false
  num: Array<Dictionary> = []
  data_c = {
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
  // type = 'pie'
  constructor(
    public service: InsertionsService,
    public server: TenantsSevice,
    
  ) {}
 
  ngOnInit() {
    this.getAllTennats()
    


  }
 
   getAllTennats() {
    this.server.getAllTenants().subscribe((data) => {
      this.TenantsList = data
      this.getAllInsertions()
      // this.TenantsFilterList=data;
    })
  }
   getAllInsertions() {

    this.service.getAllInsertions().subscribe((data) => 
    {
      this.InsertionsList = data
      this.InsertionsList.forEach((element) => {
        var e = this.TenantsList.filter((ep) => ep.TenantCode == <number>(<unknown>element.TenantId),)[0]
        element.TenantId = e
        var dic :Dictionary={Name:(element.TenantId.LastName+' '+element.TenantId.FirstName),Num:0}
        this.num.push(dic)
        var a = 0
        a = Number(element.Amount)
        this.allIn += a
      })
      this.num=  Array.from(this.num.reduce((m, t) => m.set(t.Name, t), new Map()).values())
      this.InsertionsList.forEach((element) => {
        let a: number = 0
        a = Number(element.Amount)
        var res:Dictionary = this.num.find(el => el.Name ==(element.TenantId.LastName+' '+element.TenantId.FirstName) );
        res.Num += a
        })     
      this.num= this.num.sort((a,b)=>{
        return a.Num -b.Num
      })     
     
     this.num.forEach((e) => {
        let numb = []
        this.data_c.labels[this.data_c.labels.length] = e.Name
        numb.push(e.Num)
        this.data_c.datasets[0].data[this.data_c.datasets[0].data.length] = numb
    })
    console.log(this.data_c.labels)
    console.log(this.data_c.datasets[0].data)
}
)}
 }
