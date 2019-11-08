import { Component, OnInit, Renderer2, Input, Inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { VisitorVisitDetailView } from '../../../model/visitorVisitDetailView';
import 'lightslider';
@Component({
  selector: 'visitor-metrics',
  styleUrls: ['./visitorMetrics.component.css'],
  templateUrl: './visitorMetrics.html'
})
export class VisitorMetricsComponent implements OnInit {
  @Input() visitorMetrics: Array<VisitorVisitDetailView>;
  @Output() pathInfo = new EventEmitter<any>();
  @Input() openReportTable: any;
  @Output() openNewTable = new EventEmitter<any>();
  openTable:boolean;
  selectedVisitor: VisitorVisitDetailView;
  columData = ['name', 'mobile', 'In Time', 'Out Time', 'Vehicle No.'];
  visitorDisplayColumns: Array<any> = [
    {'element': 'visitorId', 'label': 'Visitor Id'},
    {'element': 'visitorInfo', 'label': 'Visitor Info'},
    {'element': 'inviteeInfo', 'label': 'Invitee Info'},
    {'element': 'hardwareCarried', 'label': 'Hardware Info'},
    {'element': 'actualInTime', 'label': 'In Time'},
    {'element': 'actualOutTime', 'label': 'Out Time'},
    {'element': 'vehicles', 'label': 'Vehicles'},
    {'element': 'otherGuests', 'label': 'Add. Guest Info'}];
  displayedColumnsReport: string[];
  constructor(private _renderer2: Renderer2, private sanitization: DomSanitizer,
    @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.selectedVisitor = (!!this.visitorMetrics && this.visitorMetrics !== undefined) ? this.visitorMetrics[0] : null;
    if (!!this.visitorMetrics) {
      this.visitorMetrics.forEach(item => {
        item.guestPic = this.sanitization.bypassSecurityTrustUrl(item.guestPic);
        item.hostPic = this.sanitization.bypassSecurityTrustUrl(item.hostPic);
      });
    }
    this.displayedColumnsReport = [ 'Visitor Image',
                        'Visitor Info',
                        'Hardware carried',
                        'Invitee Info',
                        'In Time',
                        'Out Time',
                        'vehicle Details',
                        'Additional Guest Info'
                      ];
    const script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        {
          $(document).ready(function() {
            var autoplaySlider = $('#autoplay').lightSlider({
                item: 5,
                auto: true,
                loop: true,
                autoWidth: false,
                slideMargin: 0,
                slideWidth: -250,
                slideMove: 1,
                pager: false,
                pauseOnHover: true,
                onBeforeSlide: function(el) {
                    $('#current').text(el.getCurrentSlideCount());
                }
            });
            $('#total').text(autoplaySlider.getTotalSlideCount());
        });
        }
    `;
    this._renderer2.appendChild(this._document.body, script);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
      if(this.openReportTable=="visitorReport")
      {
        alert('a');
        this.openTable=true;
      }
      else
      {
        this.openTable=false;
      }
  }

  openPopover = function (item) {
    this.selectedVisitor = item;
    console.log(this.selectedVisitor);
    document.getElementById('visitorlight1').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
  };
  drawPath = function (item) {
    this.pathInfo.emit(item.visitId);
  };

  openTabularReport() {
    this.openNewTable.emit([this.visitorMetrics, this.displayedColumnsReport,"visitorReport"]);
    document.getElementById('fade').style.display = 'block';
  }

  closePopUp(): void {
    document.getElementById('visitorlight').style.display = 'none';
    document.getElementById('visitorlight1').style.display = 'none';
    document.getElementById('visitorlightf').style.display = 'none';
    document.getElementById('visitorfade').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
  }

  setVisitorTypeColor(type) {
    switch (type) {
      case 'INVITED':
        return 'visitor_profile visitor_invited_class';
      case 'QR_SCAN':
        return 'visitor_profile visitor_qr_scan_class';
      case 'CHECK_IN':
        return 'visitor_profile visitor_check_in_class';
      case 'CHECK_OUT':
        return 'visitor_profile visitor_check_out_class';
      default:
        return 'visitor_profile defaultVisitorClass';
    }
  }

  setCurrentVisitStatus(type: string): string {
    switch (type) {
      case 'INVITED':
        return 'Visitor Invited';
      case 'QR_SCAN':
        return 'Visitor Checking In';
      case 'CHECK_IN':
        return 'Visitor Checked In';
      case 'CHECK_OUT':
        return 'Visitor Checked Out';
      default:
        return 'Not Available';
    }
  }

  setVisitingZonePerson(selectedVisitor) {
    let visitingZonePersonDetails = '';
    if (!!selectedVisitor && !!selectedVisitor.toAddress) {
      visitingZonePersonDetails = visitingZonePersonDetails + selectedVisitor.toAddress.address1 + ', '
      + selectedVisitor.toAddress.address2 + ', ' + selectedVisitor.toAddress.address3 + ', ';
    }
    if (!!selectedVisitor && !!selectedVisitor.targetZone) {
      visitingZonePersonDetails = visitingZonePersonDetails + 'Zone-' + selectedVisitor.targetZone;
    }
    if (!!selectedVisitor && !!selectedVisitor.targetSite) {
      visitingZonePersonDetails = visitingZonePersonDetails + ', Site-' + selectedVisitor.targetSite + '';
    }
    if (!selectedVisitor.toAddress && !selectedVisitor.targetZone && !selectedVisitor.targetSite) {
      visitingZonePersonDetails = 'Details Not Available';
    }
    return visitingZonePersonDetails;
  }

  setVisitorCurrentZone(selectedVisitor) {
    // TBD based on events received for the visitor inside the premises.
    if (!!selectedVisitor && selectedVisitor.visitorVisitStatus === 'CHECK_IN' &&
    new Date(selectedVisitor.expectedOut) < new Date() && !!selectedVisitor.actualInTime) {
      return 'Visitor Visiting Session Expired. Checkout immediate or extend visitng hours.';
    }

    if (!!selectedVisitor && selectedVisitor.visitorVisitStatus === 'INVITED' &&
    new Date(selectedVisitor.expectedOut) < new Date() && !selectedVisitor.actualInTime) {
      return 'Visitor could not visit within allowed visit session.';
    } else if (!!selectedVisitor) {
      return 'Visitor checked out of the premise.';
    } else {
      return 'No Data Available';
    }
  }

}
