import {Component, OnInit, Renderer2, Input, Inject, OnChanges, SimpleChanges, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {DomSanitizer, SafeStyle, SafeUrl} from '@angular/platform-browser';
import {mapData, alertEvents, alertFeedMetrics} from '../../../proximity';
import { VisitorVisitDetailView } from '../../../model/visitorVisitDetailView';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'main-map',
  templateUrl: './map.html',
  styleUrls: ['./map.component.css']
})

export class mapComponent implements OnInit, OnChanges {

@Input() datasource: any;
@Input() displayedColumns: any;
@Input() openTable: any;
@Input() mapData: mapData;
@Input() pathData: any;
@Input() alertFeedMetrics: alertFeedMetrics;
@Output() closeTheTablePlease = new EventEmitter<any>();
 openTheTable: Boolean = false;
 allAlerts: Array<alertEvents>;
 image: SafeUrl;
 imagestyle: SafeStyle;
 drawPath: Boolean = false;
 pathpoints: any;
 zoneImage: SafeUrl;
 zoneName: string;
 zoneid: any;
 displayedColumnsReport: string[];
 displayedColumnsAlertReport: string[];
 private currentPage: any;
 private pageSize: any;
 sortedData: any;
 selectedVisitor: VisitorVisitDetailView;
  constructor(private _renderer2: Renderer2, private sanitization: DomSanitizer,
    @Inject(DOCUMENT) private _document) { }
    dtOptions: any = {};
    tableData: any;


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

    this.image = this.sanitization.bypassSecurityTrustUrl(this.mapData.baseMapImage);
    this.imagestyle = this.sanitization.bypassSecurityTrustStyle(`url(${this.mapData.baseMapImage})`);
    this.alertFlash();

                            this.displayedColumnsReport = [ 'Visitor Image',
                            'Visitor Info',
                            'Hardware carried',
                            'Invitee Info',
                            'In Time',
                            'Out Time',
                            'vehicle Details',
                            'Additional Guest Info'
                          ];
                          this.displayedColumnsAlertReport = [ 'Type',
                          'Severity',
                          'Time',
                          'Status',
                          'Resolved/Owened By'
                        ];


   const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        {
          $(document).ready(function() {

        function printData()
        {
           var divToPrint=document.getElementById("printTable");
           newWin= window.open("");
           newWin.document.write(divToPrint.outerHTML);
           newWin.print();
           newWin.close();
        }

        $('#button').on('click',function(){
        printData();
        })
      });
    }
    `;
    this._renderer2.appendChild(this._document.body, script);
  }


  ngOnChanges (changes: SimpleChanges) {
    if (!!changes.pathData && !changes.pathData.firstChange) {
      if (changes.pathData.currentValue.pathDetail.length > 0) {
    this.drawPath = true;
    this.pathpoints = changes.pathData.currentValue;
      }
    }
    this.alertFlash();
  }

  openGuestReport = function (item) {
    this.selectedVisitor = item;
    document.getElementById('visitorlight11').style.display = 'block';
    document.getElementById('fadereport').style.display = 'block';
  };
  closePopUpVRreport = function() {
    document.getElementById('visitorlight11').style.display = 'none';
    document.getElementById('fadereport').style.display = 'none';
  };
  closePopUpARreport = function() {
    document.getElementById('visitor-report-alert').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
  };
  onGateSelected = function(label) {
    console.log('gate', label);
    this.gateSelected = label;
    document.getElementById('gatemetricpopup').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
  };

  openZoneImage(zone): void {
    this.drawPath = false;
    this.zoneid = zone.id;
    this.zoneName = zone.name;
    this.zoneImage = this.sanitization.bypassSecurityTrustUrl(zone.zoneImage);
    // document.getElementById('light').style.display = 'block';
    // document.getElementById('light2').style.display = 'block';
    document.getElementById('zonepopup').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
    // Zone Alert Flash/Blink Animation Removal.
    this.removeAlertFlash(zone);
  }

  closePopUp(): void {
    document.getElementById('visitorlight').style.display = 'none';
    document.getElementById('visitor-report').style.display = 'none';
    document.getElementById('zonepopup').style.display = 'none';
    document.getElementById('visitorlight1').style.display = 'none';
    document.getElementById('gatemetricpopup').style.display = 'none';
  document.getElementById('light').style.display = 'none';
  document.getElementById('light2').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
 }

 alertFlash() {
  $(document).ready(function() {
    const animateElements = document.getElementsByTagName('animate');
    for (let i = 0; i < animateElements.length; i++) {
      const zoneId = animateElements[i].getAttribute('id').split('-')[1];
     document.getElementById('zone-' + zoneId).classList.add('active');
    }
  });
}

removeAlertFlash(zone) {
  const zonePolygonEle = document.getElementById('zone-' + zone.id);
  if (zonePolygonEle.style.stroke === 'red') {
    zonePolygonEle.classList.remove('active');
    // zonePolygonEle.setAttribute('style', "position: 'absolute'; stroke: rgb(175, 175, 175);");
    // zonePolygonEle.removeChild(zonePolygonEle.firstElementChild);
    this.mapData.zonesDetail[zone.id - 1].zoneAlerts = [];
    console.log('map data', this.mapData.zonesDetail[zone.id - 1].zoneAlerts);
  }
}

closeTheTable(flag) {
  this.closeTheTablePlease.emit(true);
}

}
