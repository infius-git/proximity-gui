import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gate-details',
  templateUrl: './gateDetails.html',
  styleUrls: ['./gateDetails.component.css']
})
export class GateDetailsComponent implements OnInit {
  @Input() openReportTable: any;
  @Input() dataSource: any;
  @Output() closeTable = new EventEmitter<any>();
  openTable:boolean;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.openReportTable=="GatePopup")
    {
      this.openTable=true;
    }
    else
    {
      this.openTable=false;
    }
}
closePopUp = function() {
  this.closeTable.emit("");
  document.getElementById('fade').style.display = 'none';
//      $('.visitor-mat-tbl').hide();
 };

}
