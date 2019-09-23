import { Component, OnInit, Renderer2, Input, Inject, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { visitorMetrics, metrics } from '../../../proximity';
import { VisitorVisitDetailView } from '../../../model/visitorVisitDetailView';
import * as $ from 'jquery';
import 'lightslider';
import { IfStmt, CompileShallowModuleMetadata } from '@angular/compiler';
@Component({
  selector: 'visitor-metrics',
  styleUrls: ['./visitorMetrics.component.css'],
  templateUrl: './visitorMetrics.html'
})
export class VisitorMetricsComponent implements OnInit {
  @Input() visitorMetrics: Array<VisitorVisitDetailView>;
  @Output() pathInfo = new EventEmitter<any>();
  @Output() openTable = new EventEmitter<any>();
  selectedVisitor: VisitorVisitDetailView;
  columData = ['name', 'mobile', 'Vehicle No.', 'Make', 'Arrival Time', 'Exp. Out Time', 'parking allocation time', 'Barcode'];
  constructor(private _renderer2: Renderer2, private sanitization: DomSanitizer,
    @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.selectedVisitor = (!!this.visitorMetrics && this.visitorMetrics !== undefined) ? this.visitorMetrics[0] : null;
    if (!!this.visitorMetrics) {
      this.visitorMetrics.forEach(item => {
        item.guestPic = this.sanitization.bypassSecurityTrustUrl(item.guestPic)
      });
    }
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        {
          $(document).ready(function() {
            var autoplaySlider = $('#autoplay').lightSlider({
                item: 4,
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

  openPopover = function (item) {
    this.selectedVisitor = item;
    document.getElementById('visitorlight').style.display = 'block';
    document.getElementById('visitorfade').style.display = 'block';
  }
  drawPath = function (item) {
    this.pathInfo.emit(item.visitId)
  }

  openTabularReport() {
    this.openTable.emit(true);
    document.getElementById('fade').style.display = 'block';
  }
  closePopUp(): void {
    document.getElementById('visitorlight').style.display = 'none';
    document.getElementById('visitorfade').style.display = 'none';
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
      visitingZonePersonDetails = visitingZonePersonDetails + selectedVisitor.toAddress.address1 + ', ' + selectedVisitor.toAddress.address2 + ', ' + selectedVisitor.toAddress.address3 + ', ';
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
    if (!!selectedVisitor && selectedVisitor.visitorVisitStatus === 'CHECK_IN' && new Date(selectedVisitor.expectedOut) < new Date() && !!selectedVisitor.actualInTime) {
      return 'Visitor Visiting Session Expired. Checkout immediate or extend visitng hours.';
    }

    if (!!selectedVisitor && selectedVisitor.visitorVisitStatus === 'INVITED' && new Date(selectedVisitor.expectedOut) < new Date() && !selectedVisitor.actualInTime) {
      return 'Visitor could not visit within allowed visit session.';
    } else if (!!selectedVisitor) {
      return 'Visitor checked out of the premise.';
    } else {
      return 'No Data Available';
    }
  }

}
