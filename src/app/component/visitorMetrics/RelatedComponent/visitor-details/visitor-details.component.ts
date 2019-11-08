import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'visitor-details',
  templateUrl: './visitor-details.html',
  styleUrls: ['./visitor-details.component.css']
})
export class VisitorDetailsComponent implements OnInit {
  @Input() dataSource: any;
  @Input() displayColumns: any;
  @Input() openReportTable: any;
  @Output() closeTable = new EventEmitter<any>();
  openTable:boolean;
  selectedVisitor:any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(this.openReportTable=="visitorDetailsPopup")
      {
        this.openTable=true;
        
      }
      else
      {
        this.openTable=false;
      }
      this.selectedVisitor=this.dataSource;
  }
  closePopUp = function() {
    this.closeTable.emit("");
    document.getElementById('fade').style.display = 'none';
//      $('.visitor-mat-tbl').hide();
   };

   

}
