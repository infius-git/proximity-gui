import { Component, OnInit,Input } from '@angular/core';
import {topBar} from '../../../proximity';
@Component({
  selector: 'top-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
@Input() topData:topBar;
  constructor() { }

  ngOnInit() {
  }

}
