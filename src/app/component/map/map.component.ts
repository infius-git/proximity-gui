import {Component, OnInit, AfterViewInit,Renderer2, Input,Inject, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeStyle, SafeUrl} from '@angular/platform-browser';
import {mapData,alertEvents, alertFeedMetrics} from '../../../proximity';
import { Sort, MatPaginator, MatTableDataSource} from '@angular/material';
import { VisitorVisitDetailView } from '../../../model/visitorVisitDetailView';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'main-map',
  templateUrl: './map.html',
  styleUrls: ['./map.component.css']
})

export class mapComponent implements OnInit, OnChanges, AfterViewInit {

@Input() datasource: any;
@Input() openTable: any;
@Input() mapData: mapData;
@Input() pathData: any;
@Input() alertFeedMetrics: alertFeedMetrics;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 openTheTable: Boolean = false;
 allAlerts: Array<alertEvents>;
 image: SafeUrl;
 imagestyle: SafeStyle;
 drawPath: Boolean = false;
 pathpoints: any;
 zoneImage: SafeUrl;
 zoneName: string;
 displayedColumns: string[];
 displayedColumnsReport: string[];
 displayedColumnsAlertReport: string[];
 private currentPage: any;
 private pageSize: any;
 sortedData: any;
 selectedVisitor: VisitorVisitDetailView;
  constructor(private _renderer2: Renderer2,private sanitization: DomSanitizer,
    @Inject(DOCUMENT) private _document) { }
    dtOptions: any = {};
    tableData:any;
  

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
    // this.sortedData = new MatTableDataSource(this.datasource);
    // // console.log(JSON.stringify(this.sortedData.data));
    // if (!!this.sortedData &&  this.sortedData !== undefined && this.datasource !==undefined) {
    //     this.sortedData.paginator = this.paginator;
    //     this.sortedData.paginator.length = this.datasource.length;
    //     this.sortedData.paginator.pageSize = 5;
    //     this.sortedData.paginator.pageSizeOptions = [1, 5, 10, 15, 20, 25, 50, 100];
    // }
    this.allAlerts = !!this.alertFeedMetrics  && this.alertFeedMetrics[0]!==undefined ? this.alertFeedMetrics[0].alert_event_feed : [{category:'None',type:'INFO', color: 'green',zone_name: 'No', text: 'No Alerts' ,deviceId: null,deviceType: null, timestamp: null, cardId: null }];
    this.image = this.sanitization.bypassSecurityTrustUrl(this.mapData.baseMapImage);
    this.imagestyle = this.sanitization.bypassSecurityTrustStyle(`url(${this.mapData.baseMapImage})`);
    this.alertFlash();
    this.displayedColumns = [ 'name',
                              'mobile',
                              'email',
                              'guestType',
                              'visitorVisitStatus',
                              'issuedCardId',
                              'actualInTime',
                              'actualOutTime',
                              'expectedIn',
                              'expectedOut',
                              'vehicles',
                              'otherGuests',
                              'targetZone',
                              'targetSite'
                            ];
                            this.displayedColumnsReport = [ 'Visitor Info',
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
                          

   let script = this._renderer2.createElement('script');
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

  ngAfterViewInit() {
    if (!!this.sortedData && this.sortedData !== undefined) {
    this.sortedData.paginator = this.paginator;
  }
}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.pathData && !changes.pathData.firstChange) {
      if (changes.pathData.currentValue.pathDetail.length > 0) {
    this.drawPath = true;
    this.pathpoints = changes.pathData.currentValue;
      }
    }
    if (!!changes.openTable && !changes.openTable.firstChange) {
      this.openTheTable = true;
    }
    this.alertFlash();
  }

  openGuestReport = function (item) {
    this.selectedVisitor = item;
    document.getElementById('visitorlight11').style.display = 'block';
    document.getElementById('fadereport').style.display = 'block';
  }
  closePopUpVRreport=function() {
    document.getElementById('visitorlight11').style.display = 'none';
    document.getElementById('fadereport').style.display = 'none';
  }
  closePopUpARreport=function() {
    document.getElementById('visitor-report-alert').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
  }
  onGateSelected=function(label) {
    document.getElementById('gatemetricpopup').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
  }
  closeTabularReport=function() {
    document.getElementById('fullfade').style.display = 'none';
    $('.visitor-mat-tbl').hide();
  }
  
  openZoneImage(zone): void {
    this.drawPath = false;
    this.zoneName = zone.name;
    this.zoneImage = this.sanitization.bypassSecurityTrustUrl(zone.zoneImage);
    //document.getElementById('light').style.display = 'block';
    //document.getElementById('light2').style.display = 'block';
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
    for(let i = 0; i < animateElements.length; i++) {
      const zoneId = animateElements[i].getAttribute('id').split('-')[1];
     document.getElementById('zone-' + zoneId).classList.add('active');
    }
  });
}

removeAlertFlash(zone) {
  
  const zonePolygonEle = document.getElementById('zone-' + zone.id);
  if(zonePolygonEle.style.stroke === 'red') {
    zonePolygonEle.classList.remove('active');
    //zonePolygonEle.setAttribute('style', "position: 'absolute'; stroke: rgb(175, 175, 175);");
    //zonePolygonEle.removeChild(zonePolygonEle.firstElementChild); 
    this.mapData.zonesDetail[zone.id-1].zoneAlerts=[];
    console.log('map data',this.mapData.zonesDetail[zone.id-1].zoneAlerts);
  }
}

sortData(sort: Sort) {
  const data = (!!this.datasource && this.datasource !== undefined) ? this.datasource.slice() : null;
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = !!data ? data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'name': return this.compare(a.name, b.name, isAsc);
      case 'mobile number': return this.compare(a.mobile, b.mobile, isAsc);
      case 'vehicle number': return this.compare(a.vehicle_number, b.vehicle_number, isAsc);
      case 'vehicle type': return this.compare(a.vehicle_type, b.vehicle_type, isAsc);
      case 'in time': return this.compare(a.in_time, b.in_time, isAsc);
      case 'out time': return this.compare(a.out_time, b.out_time, isAsc);
      case 'parking time': return this.compare(a.parking_time, b.parking_time, isAsc);
      case 'qr code': return this.compare(a.qr_code, b.qr_code, isAsc);
      default: return 0;
    }
  }) : null;
}

compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  updatePage(e) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.datasource.slice(start, end);
    this.sortedData = part;
  }

  setupFilter(column: string) {
    this.sortedData.filterPredicate = function(data, filter) {
    const textToSearch = data[column] && data[column].toLowerCase() || '';
    return textToSearch.indexOf(filter) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    this.sortedData.filter = filterValue.trim().toLowerCase();
  }
}
