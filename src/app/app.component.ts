import { Component, OnInit } from '@angular/core';
import { ProximityService } from './service';
import { Subscription, interval, Subscribable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { proximity, topBar, sideBar, securityOverview, eventSummary, monitorMetrics, entrySummary, anomalySummary, towerEntry, visitorMetrics, parkingMetrics, mapData } from '../proximity';
import { CommonResponse } from "../model/commonresponse";
import { SecurityGuardView } from "../model/securityGuardView";
import { VisitorVisitDetailView } from "../model/visitorVisitDetailView";
import { EventSummaryView } from "../model/eventSummaryView";
const timeInterval = interval(50000);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  proximity: CommonResponse;
  staticProximity: proximity;
  topBar: topBar;
  sideBar: sideBar;
  // securityOverview:Array<SecurityGuardView>;
  securityOverview: securityOverview;
  eventSummary: Array<EventSummaryView>;
  monitorMetrics: Array<monitorMetrics> = [];
  entrySummary: entrySummary;
  towerEntry: towerEntry;
  eventData: any = [];
  visitorMetrics: Array<VisitorVisitDetailView>;
  anomalySummary: anomalySummary;
  parkingMetrics: parkingMetrics;
  isDataAvailable: boolean;
  isMapAvailable: boolean;
  mapData: mapData;
  pathData: any;
  subscription: Subscription;
   dateTime:any;
  constructor(private proximityService: ProximityService) { }
  ngOnInit() {
    this.isDataAvailable = false;

    this.proximityService.getMapData()
      .subscribe(mapData => {
        this.mapData = mapData;
        this.isMapAvailable = true;
      })
    this.proximityService.getStaticData().subscribe(proximity => {
      this.staticProximity = proximity;
      this.topBar = proximity.top_bar;
      this.sideBar = proximity.side_bar;

      this.securityOverview = proximity.main_panel.widgets.security_overview;
      this.entrySummary = proximity.main_panel.widgets.entry_summary;
      this.anomalySummary = proximity.main_panel.widgets.anomaly_summary;
      this.towerEntry = proximity.main_panel.widgets.tower_entry;
      this.parkingMetrics = this.towerEntry.parking_metrics;
    })

    this.proximityService.getAllData().subscribe(proximity => {

      // this.securityOverview = proximity.data.securityGuardsSummary;
      this.eventSummary = proximity.data.eventSummary;
      this.calculateEventData();


      this.visitorMetrics = proximity.data.visitorSummary;

      this.isDataAvailable = true;
    })

    this.subscription = timer(30000, 40000).pipe(
       
      switchMap(() => this.proximityService.getPartialData())).subscribe(partialData => {
        if (!!partialData.data.eventSummary && partialData.data.eventSummary.length > 0) {
          this.eventSummary = partialData.data.eventSummary;
          this.calculateEventData();
        }
        if (!!partialData.data.securityGuardsSummary && partialData.data.eventSummary.length > 0) {

        }
        if (!!partialData.data.visitorSummary && partialData.data.visitorSummary.length > 0) {

        }
      })
  }

  calculateEventData() {
    let temp = {};
    let newTemp = {};
    let gateMetricData = [];
    let alertFeedData = [];
    this.eventData = [];
    let color = '';
    this.eventSummary.forEach(item => {
      if (!!temp[item.eventCatagory]) {
        temp[item.eventCatagory]['count'] = temp[item.eventCatagory]['count'] + 1;
      } else {
        temp[item.eventCatagory] = { 'name': item.eventCatagory, 'count': 1 };
      }
      if (item.eventCatagory === 'VISITS_CHECKED_IN') {
        if (!!item.gateId) {
          if (item.eventType == 'WARNING') {
            color = 'yellow';
          } else if (item.eventType == 'INFO') {
            color = 'green';
          } else if (item.eventType == 'ALERT') {
            color = 'red';
          }
          if (!!newTemp[item.gateId]) {
            gateMetricData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText });
            alertFeedData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText })
            newTemp[item.gateId]['gate_pass_metrics'] = gateMetricData;
            newTemp[item.gateId]['alert_feed'] = alertFeedData;
          } else {
            gateMetricData = [];
            alertFeedData = [];

            gateMetricData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText });
            alertFeedData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText });
            newTemp[item.gateId] = { label: item.gateId, gate_pass_metrics: gateMetricData, alert_feed: alertFeedData };
          }
        }
      }
    })
    for (let item in newTemp) {
      this.monitorMetrics.push(newTemp[item]);
    }
    for (let item in temp) {
      this.eventData.push(temp[item]);
    }
  }
  getPathInfo(id) {
    this.proximityService.getPathData(id).subscribe(path => {
      this.pathData = path;
    });
  }
  // getProximity(): void {
  //   this.proximityService.getAllData()
  //   .subscribe(CommonResponse => {
  //     this.proximity = proximity;
  //     this.topBar = proximity.top_bar;
  //     this.sideBar = proximity.side_bar;
  //     this.securityOverview = proximity.main_panel.widgets.security_overview;
  //     this.eventSummary = proximity.main_panel.widgets.event_summary;
  //     this.monitorMetrics = proximity.main_panel.widgets.monitor_metrics;
  //     this.entrySummary = proximity.main_panel.widgets.entry_summary;
  //     this.anomalySummary = proximity.main_panel.widgets.anomaly_summary;
  //     this.visitorMetrics = proximity.main_panel.widgets.visitor_metrics;
  //     this.towerEntry = proximity.main_panel.widgets.tower_entry;
  //     this.parkingMetrics = this.towerEntry.parking_metrics;
  //     this.isDataAvailable = true;
  //   });
  // }


}


