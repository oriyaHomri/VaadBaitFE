import { Component, OnInit } from '@angular/core';
import { Insertions } from 'src/app/classes/Insertions';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InsertionsService } from 'src/app/service/Insertions.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { WorkSheet } from 'xlsx';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { Tenants } from 'src/app/classes/Tenants';
import { TenantsSevice } from 'src/app/service/Tenants.service';
import { InsertionsAdd } from 'src/app/classes/InsertionsAdd';
@Component({
  selector: 'app-Insertions',
  templateUrl: './Insertions.component.html',
  styleUrls: ['./Insertions.component.css']
})
export class InsertionsComponent implements OnInit {
  @ViewChild('signupForm') form: NgForm;
  @ViewChild('divS') divHtml: ElementRef;
  bool: boolean=false;
  constructor(private server: InsertionsService, private service: TenantsSevice) {
    this.Insertions = new InsertionsAdd();
   this.Insertions.Description="תשלום ועד בית"
  }
 // id: number;
  head = [['שם הדייר', 'ת"ז הדייר', ' סכום תשלום', 'תאריך תשלום', 'סיבת תשלום ']];
  dataForPDF = [];
  //InsertionsList: Array<Insertions>=[];
  InsertionsByYear: Insertions[];
  Insertions: InsertionsAdd;
  search: '';
  InsertionsList:Array<Insertions> = [];
  TenantsList: Array<Tenants> = [];
  ngOnInit() {

    this.service.getAllTenants().subscribe((data) => {
      this.TenantsList = data;
    }
    )
    this.getAllInsertions();
  }
  private getAllInsertions() {
    this.server.getAllInsertions().subscribe((data) => {
    this.InsertionsList = data;
    this.InsertionsList.forEach(element => {
    var e = this.TenantsList.filter
    (ep => ep.TenantCode ==<number><unknown>element.TenantId)[0];
    element.TenantId=e;})})
    
    // this.getInsertionsByYearOrderTenants();
  }
  onSubmitForm() {
    this.server.AddInsertions(this.Insertions);
    this.form.reset();
    this.getAllInsertions();
  }
  Delete(n: Insertions) {
    if (confirm('האם ברצונך למחוק את ההכנסה ' + n.IdInsertion + '?')) {
      this.server.removeInsertions(n.IdInsertion);
      this.getAllInsertions();
    }
  }
  update(n) {
    if (this.Insertions.Description !== '') {
      n.Description = this.Insertions.Description;
            
   
      n.Amount = this.Insertions.Amount;
            this.server.update(n);
            this.getAllInsertions()
          }  
    else { this.bool=true }
  }
  //קוד להורדת דוחות
  getInsertionsByYearOrderTenants() {
    this.InsertionsList=this.InsertionsList
      // this.server.getInsertionsByYearOrderTenants(this.id).subscribe((res) => { this.InsertionsList = res; });
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
  creatExcel() {
    let fileExtension = '.xlsx'
    let fileName = 'report'
    let sheetName: string = 'דוח הוצאות '

    const ws: WorkSheet = XLSXUtils.json_to_sheet(this.dataConvert())
    const wb = XLSXUtils.book_new()
    XLSXUtils.book_append_sheet(wb, ws, sheetName)

    XLSX.writeFile(wb, `${fileName}${fileExtension}`)
  }
  private dataConvert() {
    this.dataForPDF = this.InsertionsList.map(({ TenantId }) => ({
      'שם הדייר ': TenantId.LastName + ' ' + TenantId.FirstName,
      'ת"ז דייר': TenantId.TenantCode,
    }))
    for (let i = 0; i < this.InsertionsList.length; i++) {
      this.dataForPDF[i]['סכום תשלום'] = this.InsertionsList[i].Amount
      this.dataForPDF[i]['תאריך תשלום'] = this.InsertionsList[i].Date1
      this.dataForPDF[i]['סיבת תשלום'] = this.InsertionsList[i].Description
    }
    return this.dataForPDF
  }
  print() {
    window.print()
  }
  
  
 
  
 
}
