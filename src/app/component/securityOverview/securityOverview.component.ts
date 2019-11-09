import { Component, OnInit,Input } from '@angular/core';
import {securityOverview} from '../../../proximity';
import { Chart } from 'angular-highcharts';
import {SecurityGuardView} from '../../../model/securityGuardView';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
// import * as highcharts from '../../../../node_modules/highcharts/highcharts';
@Component({
  selector: 'security-overview',
  templateUrl: './securityOverview.html',
  styleUrls: ['./securityOverview.component.css']
})
export class securityOverviewComponent implements OnInit {
@Input() securityOverview:securityOverview;
chart:Chart;
dayCount:any=0;
nightCount:any=0;
  constructor() { }

  ngOnInit() {
      this.drawSecurityChart();
      console.log(this.securityOverview);
    
    for( var el in this.securityOverview.team_stats.allocations ) {
        if( this.securityOverview.team_stats.allocations.hasOwnProperty( el ) ) {
            this.dayCount += parseFloat( this.securityOverview.team_stats.allocations[el] );
            this.nightCount += parseFloat( this.securityOverview.team_stats.allocations[el] );
          }
    }
  }
drawSecurityChart = function(){
    var statsData = []; 
    for(var item in this.securityOverview.team_stats.allocations){
        var temp = {};
       temp['name']= item;
       temp['y'] = this.securityOverview.team_stats.allocations[item];
       statsData.push(temp);
    }
    this.chart = new Chart(<any>{
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text:null
        },
        tooltip: {
            enabled:false
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                 borderWidth: 2,
                 borderColor: '#343542',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    distance: -25,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        series: [{
            name: 'Share',
            data: statsData
        }]
    });
}
}
