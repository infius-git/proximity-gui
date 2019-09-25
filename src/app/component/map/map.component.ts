import {Component, OnInit, AfterViewInit, Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeStyle, SafeUrl} from '@angular/platform-browser';
import {mapData} from '../../../proximity';
import { Sort, MatPaginator, MatTableDataSource} from '@angular/material';
import { FormControl } from '@angular/forms';

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
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 openTheTable: Boolean = false;
 image: SafeUrl;
 imagestyle: SafeStyle;
 drawPath: Boolean = false;
 pathpoints: any;
 zoneImage: SafeUrl;
 zoneName: string;
 displayedColumns: string[];
 private currentPage: any;
 private pageSize: any;
 sortedData: any;
  constructor(private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.sortedData = new MatTableDataSource(this.datasource);
    // console.log(JSON.stringify(this.sortedData.data));
    if (!!this.sortedData &&  this.sortedData !== undefined && this.datasource !==undefined) {
        this.sortedData.paginator = this.paginator;
        this.sortedData.paginator.length = this.datasource.length;
        this.sortedData.paginator.pageSize = 5;
        this.sortedData.paginator.pageSizeOptions = [1, 5, 10, 15, 20, 25, 50, 100];
    }

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
    zonePolygonEle.setAttribute('style', "position: 'absolute'; stroke: rgb(175, 175, 175);");
    zonePolygonEle.removeChild(zonePolygonEle.firstElementChild); 
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
