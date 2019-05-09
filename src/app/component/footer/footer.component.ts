import { Component, OnInit,Input } from '@angular/core';
import {parkingMetrics} from '../../../proximity';
import {Chart} from 'angular-highcharts'
@Component({
  selector: 'foot-bar',
  templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
@Input() parkingMetrics:parkingMetrics;
alertChart:Chart;
predictiveChart:Chart;
  constructor() { }

  ngOnInit() {
this.drawGraph()
  }
drawGraph=function(){
this.alertChart = new Chart(<any>{
    chart: {
      type: 'area'
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    legend: {
        enabled: false,
              align: 'center',
              verticalAlign: 'top',
              floating: true,
              x: 0,
              y: 0
          },
    xAxis: {
      
          min: 0.5,
      max: 6.5,
      gridLineColor: '#333541',
          gridLineWidth: 1,
          verticalAlign:'top',
          lineWidth:0,
          offset:0,
          minPadding:0,
          maxPadding:0,
          margin:[0,0,0,0],
          
      categories: ['12-03', '03-06', '06-09', '09-12', '12-03', '03-06', '06-09', '09-12'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    yAxis: {
      gridLineColor: '#333541',
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return this.value / 1000;
        }
      }
    },
    tooltip: {
      split: false,
      //valueSuffix: ' millions'
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    
    series: [{
      
      name: 'Alert',
    color: '#f13c5a',
      data: [502, 635, 809, 947, 1402, 3634, 5268],
    }, {
      name: 'Warning',
    color: '#1378fe',
      data: [106, 107, 111, 133, 221, 767, 1766]
    },{
      name: 'Connecting',
    color: '#05e764',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }]
});
this.predictiveChart = new Chart(<any>{
  chart: {
    type: 'column'
  },
  title: {
    text: null
  },
  subtitle: {
    text: null
  },
  xAxis: {
    type: 'category',
	gridLineColor: '#333541',

        gridLineWidth: 1,
		labels:
                        {
                            enabled: false
                        }
	
  },
  yAxis: {
	  gridLineColor: '#333541',
    title: {
      text: null
    }

  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: false,
        format: '{point.y:.1f}%'
      }
    }
  }, 
  series: [
    {
      "name": "Browsers",
      "colorByPoint": true,
      "data": [
        {
			"color": '#05e764',
          "name": "Chrome",
          "y": 80,
          "drilldown": "Chrome"
        },
        {
			"color": '#1378fe',
          "name": "Firefox",
          "y": 65,
          "drilldown": "Firefox"
        },
        {
			"color": '#f13c5a',
          "name": "Internet Explorer",
          "y": 55,
          "drilldown": "Internet Explorer"
        }
      ]
    }
  ],
  drilldown: {
    "series": [
      {

        "name": "Chrome",
        "id": "Chrome",
        "data": [
          
        ]
      },
      {
        "name": "Firefox",
        "id": "Firefox",
        "data": [
          
        ]
      },
      {
        "name": "Internet Explorer",
        "id": "Internet Explorer",
        "data": [
          
        ]
      }
      
    ]
  }
})
}
}
