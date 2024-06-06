import { Component, OnInit, ViewChild } from '@angular/core';
 import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Dictionary } from 'src/app/classes/Dictionary';

//import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
    dic:Dictionary[];
    dic1:Dictionary[];
    dic2:Dictionary[];
  constructor(/*public ser:statisticsService*/) {
  //   var numb=[] 
  //   this.ser.getStaticPro().subscribe((a)=>
  //   {this.dic=a
  //   this.dic.forEach(element => {
  //      this.data.labels[this.data.labels.length]=element.Name
  //     numb.push(element.Num)
  //   });
  //   this.data.datasets[0].data=numb;
  // })
  //   var numb1=[] 
  //   this.ser.getStatic().subscribe((a)=>
  //   {this.dic1=a
  //   this.dic1.forEach(element => {
  //      this.data1.labels[this.data1.labels.length]=element.Name
  //     numb1.push(element.Num)
  //   });
  //   this.data1.datasets[0].data=numb1;
  // })
  // var numb2=[] 
  //   this.ser.getStaticAge().subscribe((a)=>
  //   {this.dic2=a
  //   this.dic2.forEach(element => {
  //      this.data2.labels[this.data2.labels.length]=element.Name
  //     numb2.push(element.Num)
  //   });
  //   this.data2.datasets[0].data=numb2;
  // })
  }

  ngOnInit(): void {
  }
  
  data= {
    labels: ['הוצאות','הכנסות'],
    datasets: [{
        label: 'תקציב',
        data: [ 300, 500 ],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
 };
//data1= {
//     labels: [],
//     datasets: [{
//         label: 'profession',
//         data: [40],
//         backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//     }]
// };
// data2= {
//     labels: [],
//     datasets: [{
//         label: 'profession',
//         data: [],
//         backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//     }]
// };
  // type = 'bar';
    type='pie'
  type2='line'
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  
}
