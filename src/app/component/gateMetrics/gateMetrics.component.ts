import { Component, OnInit,Input,Renderer2,Inject,AfterViewInit,OnDestroy} from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import {monitorMetrics,gatePass} from '../../../proximity';
import * as $ from "jquery";
import "lightslider";
import { MalihuScrollbarService, } from 'ngx-malihu-scrollbar';
@Component({
  selector: 'monitor-metric',
  templateUrl: './gateMetrics.html',
  styleUrls: ['./gateMetrics.component.css']
})
export class GateMetricsComponent implements OnInit {
@Input() monitorMetrics:Array<monitorMetrics>;
gateCount:Array<any>;
selectedGate;any;
selectedLabel:any;
selectedMetric:Array<gatePass>;
selectedalert:Array<gatePass>;
scrollbarOptions:any;
gateTime:any;
  constructor(private mScrollbarService: MalihuScrollbarService,private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document) {
      this.gateCount =[];
   }
   ngAfterViewInit() {
    this.mScrollbarService.initScrollbar('#gateAlet', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
    this.mScrollbarService.initScrollbar('#alertFeed', { axis: 'y', theme: 'dark-thick', scrollButtons: { enable: true } });
  }
  ngOnInit() {
    this.gateTime = new Date().toDateString("YYYY/MMM/DD HH:MM:SS")
    this.scrollbarOptions = { axis: 'yx', theme: 'minimal-dark' };
    let script = this._renderer2.createElement('script');    
    script.type = `text/javascript`;
    script.text = `
        {
            $(document).ready(function () {
    $('#tabsJustified').lightSlider({
      controls: true,
      item: 5,
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
    })
  })
}`;
this._renderer2.appendChild(this._document.body, script);      
    this.selectedLabel = this.monitorMetrics[0].label;
      var temp:any = {};
      this.monitorMetrics.forEach((item)=>{
        temp = {};
          temp.value = item.label;
          temp.label = item.label;
          this.gateCount.push(temp);
      })
      this.selectedGate = 'Gate '+this.monitorMetrics[0].label;
      this.selectedMetric = this.monitorMetrics[0].gate_pass_metrics;
      this.selectedalert = this.monitorMetrics[0].alert_feed;
  }

  onGateSelected = function(label){
    this.monitorMetrics.forEach((item)=>{
        if(item.label === label){
            this.selectedGate = 'Gate '+item.label;
      this.selectedLabel = item.label;
            this.selectedMetric = item.gate_pass_metrics;
            this.selectedalert = item.alert_feed;
        }
    })
    this.openPopUp();
  }
  openPopUp():void{
    document.getElementById('gatelight').style.display='block';
    document.getElementById('gatefade').style.display='block';
  }
  closePopUp():void{
  document.getElementById('gatelight').style.display='none';
  document.getElementById('gatefade').style.display='none';
 }
  ngOnDestroy() {
    this.mScrollbarService.destroy('#gateAlert');
    this.mScrollbarService.destroy('#alertFeed');
  }
}
