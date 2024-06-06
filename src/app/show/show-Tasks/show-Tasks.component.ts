import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Tasks } from 'src/app/classes/Tasks';

@Component({
  selector: 'app-show-Tasks',
  templateUrl: './show-Tasks.component.html',
  styleUrls: ['./show-Tasks.component.css']
})
export class ShowTasksComponent implements OnInit {
  @Input() tasks: Tasks;


  constructor() { }

  ngOnInit() { }


}
