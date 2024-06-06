import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Expenses } from 'src/app/classes/Expenses';

@Component({
  selector: 'app-show-expenses',
  templateUrl: './show-expenses.component.html',
  styleUrls: ['./show-expenses.component.css']
})
export class ShowExpensesComponent implements OnInit {
  @Input() expenses: Expenses;
  // @Output() addNumber=new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
