import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'zonal-details',
  templateUrl: './zonalDetails.html',
  styleUrls: ['./zonalDetails.component.css']
})
export class ZonalDetailsComponent implements OnInit {
  @Input() openReportTable: any;
  @Input() dataSource: any;
  @Output() closeTable = new EventEmitter<any>();
  openTable:boolean;
  selectedZoneDetails:any;
  zoneImage: any;
  constructor(private sanitization: DomSanitizer) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.openReportTable=="ZonePopup")
    {
      this.openTable=true;
    }
    else
    {
      this.openTable=false;
    }
    this.selectedZoneDetails=this.dataSource
    this.zoneImage = this.sanitization.bypassSecurityTrustUrl(this.selectedZoneDetails.zoneImage);
}
closePopUp = function() {
  this.closeTable.emit("");
  document.getElementById('fade').style.display = 'none';
//      $('.visitor-mat-tbl').hide();
 };
}
