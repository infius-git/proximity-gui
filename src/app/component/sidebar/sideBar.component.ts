import { Component, OnInit,Input } from '@angular/core';
import {sideBar} from '../../../proximity';
@Component({
  selector: 'side-bar',
  templateUrl: './sideBar.html',
  styleUrls: ['./sideBar.component.css']
})
export class sideBarComponent implements OnInit {
@Input() sideBarData:sideBar;
  constructor() { }

  ngOnInit() {
  }

}
