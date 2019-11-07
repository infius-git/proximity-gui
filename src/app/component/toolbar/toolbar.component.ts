import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import {topBar, visitorMetrics, alertFeedMetrics} from '../../../proximity';
@Component({
  selector: 'top-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
@Input() topData: topBar;
@Input() alertFeedMetrics: alertFeedMetrics;
@Input() visitorMetrics: visitorMetrics;
@Output() openNewTable = new EventEmitter<any>();
@Output() closeTheTablePlease = new EventEmitter<any>();
visitorDisplayColumns: Array<any> = [
  {'element': 'visitorId', 'label': 'Visitor Id'},
  {'element': 'visitorInfo', 'label': 'Visitor Info'},
  {'element': 'inviteeInfo', 'label': 'Invitee Info'},
  {'element': 'hardwareCarried', 'label': 'Hardware Info'},
  {'element': 'actualInTime', 'label': 'In Time'},
  {'element': 'actualOutTime', 'label': 'Out Time'},
  {'element': 'vehicles', 'label': 'Vehicles'},
  {'element': 'otherGuests', 'label': 'Add. Guest Info'}];
  constructor() { }

  ngOnInit() {
  }
  // openVisitorReport=function()
  // {
  //   document.getElementById('visitor-report').style.display = 'block';
  //   document.getElementById('fade').style.display = 'block';
  // }
  openVisitorReport=function()
  {
    
      this.openNewTable.emit([this.visitorMetrics, this.visitorDisplayColumns,"visitorReport"]);
      document.getElementById('fade').style.display = 'block';
    
  }
  openAlertReport=function()
  {
    this.openNewTable.emit([this.alertFeedMetrics, this.visitorDisplayColumns,"alertReport"]);
      document.getElementById('fade').style.display = 'block';
  }
}
