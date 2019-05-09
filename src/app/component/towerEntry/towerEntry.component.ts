import { Component, OnInit,Input } from '@angular/core';
import {towerEntry,anomalySummary,} from '../../../proximity';
import { AmChart } from "@amcharts/amcharts3-angular";
@Component({
  selector: 'tower-entry',
  templateUrl: './towerEntry.html'
})
export class TowerEntryComponent implements OnInit {
@Input() towerEntry:towerEntry;
@Input() anomalySummary:anomalySummary;
options:any;
  constructor() { }

  ngOnInit() {
    this.drawAmChart();
  }
drawAmChart = function(){
this.options=  {
    "type": "pie",
    "theme": "none",
    "dataProvider": this.anomalySummary.anomaly_data,
    "valueField": "visits",
    "titleField": "country",
    "startEffect": "elastic",
    "colorField": "color",
    "startDuration": 2,
    "labelRadius": 3,
    "innerRadius": "50%",
    "depth3D": 10,
    "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
    "angle": 35,
    "export": {
      "enabled": true
    }
  } 
}
}
