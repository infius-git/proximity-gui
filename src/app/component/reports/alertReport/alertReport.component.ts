import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {alertEvents, alertFeedMetrics} from '../../../../proximity';

@Component({
  selector: 'alert-report',
  templateUrl: './alertReport.html',
  styleUrls: ['./alertReport.component.css']
})
export class AlertReportComponent implements OnInit {
  allAlerts: Array<alertEvents>;
  @Input() alertFeedMetrics: alertFeedMetrics;
    @Input() displayColumns: any;
    @Input() openReportTable: any;
    @Output() closeTable = new EventEmitter<any>();
  displayedColumnsAlertReport: string[];
  openTable:boolean;
  dtOptions: any = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf',
      ]
    };
    this.allAlerts = !!this.alertFeedMetrics  && this.alertFeedMetrics[0] !== undefined ?
    this.alertFeedMetrics[0].alert_event_feed : [{category: 'None', type: 'INFO', color: 'green', zone_name: 'No',
    text: 'No Alerts' , deviceId: null, deviceType: null, timestamp: null, cardId: null }];
    this.displayedColumnsAlertReport = [ 'Type',
                          'Severity',
                          'Time',
                          'Status',
                          'Resolved/Owened By'
                        ];

                        
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.openReportTable=="alertReport")
    {
      this.openTable=true;
    }
    else
    {
      this.openTable=false;
    }
  }
  closeTabularReport = function() {
    this.closeTable.emit("");
    document.getElementById('fade').style.display = 'none';
//      $('.visitor-mat-tbl').hide();
   };

}
