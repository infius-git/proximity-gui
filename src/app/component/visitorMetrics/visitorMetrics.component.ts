import { Component, OnInit, Renderer2, Input, Inject,Output,EventEmitter} from '@angular/core';
import { DOCUMENT,DomSanitizer,SafeStyle,SafeUrl } from "@angular/platform-browser";
import { visitorMetrics, metrics } from '../../../proximity';
import {VisitorVisitDetailView} from '../../../model/visitorVisitDetailView';
import * as $ from "jquery";
import "lightslider";
@Component({
  selector: 'visitor-metrics',
  styleUrls:['./visitorMetrics.component.css'],
  templateUrl: './visitorMetrics.html'
})
export class VisitorMetricsComponent implements OnInit {
  @Input() visitorMetrics: Array<VisitorVisitDetailView>;
  @Output() pathInfo = new EventEmitter<any>();
  selectedVisitor: VisitorVisitDetailView;
  columData =  ["name", "mobile", "Vehicle No.", "Make", "Arrival Time", "Exp. Out Time", "parking allocation time", "Barcode"];
  constructor(private _renderer2: Renderer2,private sanitization:DomSanitizer,
    @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.selectedVisitor = this.visitorMetrics[0];
    this.visitorMetrics.forEach(item=>{
      item.guestPic = this.sanitization.bypassSecurityTrustUrl(item.guestPic)
    })
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
        {
        
            $(document).ready(function () {
                setTimeout(function(){
                  $('#lightslider-demo').lightSlider({
                    controls: false,
                    item: 8,
                    loop: false,
                    pager: false,
                    responsive: [
                      {
                        breakpoint: 480,
                        settings: {
                          item: 4
                        }
                      }
                    ]
                  });
                })
              })
        }
    `;
    this._renderer2.appendChild(this._document.body, script);
  }

  openPopover = function(item){
this.selectedVisitor = item;
document.getElementById('visitorlight').style.display='block';
document.getElementById('visitorfade').style.display='block';
  }
  drawPath = function(item){
    this.pathInfo.emit(item.visitId)
  }
  closePopUp():void{
    document.getElementById('visitorlight').style.display='none';
    document.getElementById('visitorfade').style.display='none';
   }
}
