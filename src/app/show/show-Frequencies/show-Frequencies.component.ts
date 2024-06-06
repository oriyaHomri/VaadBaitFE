import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Frequencies } from 'src/app/classes/Frequencies';

@Component({
  selector: 'app-show-Frequencies',
  templateUrl: './show-Frequencies.component.html',
  styleUrls: ['./show-Frequencies.component.css']
})
export class ShowFrequenciesComponent implements OnInit {
  @Input() Frequencies: Frequencies;
  constructor() {
  }

  ngOnInit() {
  }

}
