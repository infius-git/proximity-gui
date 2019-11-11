import { Component, OnInit } from '@angular/core';
import { ProximityService } from './service';
import { Subscription, interval, Subscribable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { proximity, topBar, sideBar, securityOverview, alertFeedMetrics, eventSummary, monitorMetrics, entrySummary, anomalySummary, towerEntry, visitorMetrics, parkingMetrics, mapData } from '../proximity';
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
  alertFeedMetrics: any = [];
  entrySummary: entrySummary;
  towerEntry: towerEntry;
  eventData: any = [];
  visitorMetrics: Array<VisitorVisitDetailView>;
  newTableData: Array<any> = [];
  displayedColumns: Array<any> = [];
  anomalySummary: anomalySummary;
  parkingMetrics: parkingMetrics;
  isDataAvailable: boolean;
  isMapAvailable: boolean;
  mapData: mapData;
  pathData: any;
  openReportTable: string;
  subscription: Subscription;
  dateTime: any;
  registeredUsersData: any;
  securityGuards:any;
  constructor(private proximityService: ProximityService) { }

  ngOnInit() {
    this.isDataAvailable = false;
    this.proximityService.getMapData().subscribe(mapData => {
      this.mapData = mapData;
      this.isMapAvailable = true;
    });

    this.proximityService.getAllUserData().subscribe(registeredUsersArray => {
      this.registeredUsersData = registeredUsersArray.data;
    });

    this.proximityService.getStaticData().subscribe(proximity => {
      this.staticProximity = proximity;
      this.topBar = proximity.top_bar;
      this.sideBar = proximity.side_bar;

      this.securityOverview = proximity.main_panel.widgets.security_overview;
      this.entrySummary = proximity.main_panel.widgets.entry_summary;
      this.anomalySummary = proximity.main_panel.widgets.anomaly_summary;
      this.towerEntry = proximity.main_panel.widgets.tower_entry;
      this.parkingMetrics = this.towerEntry.parking_metrics;
    });

    this.proximityService.getAllData().subscribe(proximity => {
      // this.securityOverview = proximity.data.securityGuardsSummary;
       this.securityGuards = proximity.data.securityGuardsSummary;
      if (!!proximity.data.eventSummary && proximity.data.eventSummary.length > 0) {
        this.eventSummary = proximity.data.eventSummary;
        this.calculateEventData();
      }

      if (!!proximity.data.visitorSummary && proximity.data.visitorSummary.length > 0) {
        this.visitorMetrics = proximity.data.visitorSummary;
        this.registeredUsersData.forEach(user => {
          this.visitorMetrics.map((visitor, index) => {
            if (user.id === visitor.hostUserId) {
              this.visitorMetrics[index].hostActiveMobileNo = user.activeMobileNumber;
              this.visitorMetrics[index].hostPic = user.actualPicUrl;
              this.visitorMetrics[index].hostThumbnailPic = user.thumbnailPicUrl;
              this.visitorMetrics[index].hostHouseNo = user.houseNo;
              this.visitorMetrics[index].hostName = user.name;
              this.visitorMetrics[index].hostPrimaryZone = user.primaryZone;
              this.visitorMetrics[index].hostSite = user.site;
            }
          });
        });
      }

      this.isDataAvailable = true;
    });

    this.subscription = timer(40000, 40000).pipe(

      switchMap(() => this.proximityService.getPartialData())).subscribe(partialData => {
        if (!!partialData.data.eventSummary && partialData.data.eventSummary.length > 0) {
          this.eventSummary = partialData.data.eventSummary;
          this.calculateEventData();
        }
        if (!!partialData.data.securityGuardsSummary && partialData.data.eventSummary.length > 0) {

        }
        if (!!partialData.data.visitorSummary && partialData.data.visitorSummary.length > 0) {
          this.visitorMetrics = partialData.data.visitorSummary;
          this.registeredUsersData.forEach(user => {
            this.visitorMetrics.map((visitor, index) => {
              if (user.id === visitor.hostUserId) {
                this.visitorMetrics[index].hostActiveMobileNo = user.activeMobileNumber;
                this.visitorMetrics[index].hostPic = user.actualPicUrl;
                this.visitorMetrics[index].hostThumbnailPic = user.thumbnailPicUrl;
                this.visitorMetrics[index].hostHouseNo = user.houseNo;
                this.visitorMetrics[index].hostName = user.name;
                this.visitorMetrics[index].hostPrimaryZone = user.primaryZone;
                this.visitorMetrics[index].hostSite = user.site;
              }
            });
          });
        }
      });
  }

  calculateEventData() {
    let temp = {};
    let newTemp = {};
    let zonedetails1: any = [];
    let gateMetricData = [];
    let alertFeedData = [];
    this.eventData = [];
    this.alertFeedMetrics = [];
    let alertsFeedOnly = [];
    let warnsFeedOnly = [];
    let alertsAndWarnsFeed = [];
    let color = '';
    //
    this.eventSummary.forEach(item => {

      if (!!temp[item.eventCatagory]) {
        temp[item.eventCatagory]['count'] = temp[item.eventCatagory]['count'] + 1;
      } else {
        temp[item.eventCatagory] = { 'name': item.eventCatagory, 'count': 1 };
      }

      if (item.eventCatagory === 'VISITS_CHECKED_IN') {
        if (!!item.gateId) {
          if (item.eventType === 'WARNING') {
            color = 'yellow';
          } else if (item.eventType === 'INFO') {
            color = 'green';
          } else if (item.eventType === 'ALERT') {
            color = 'red';
          }
          if (!!newTemp[item.gateId]) {
            gateMetricData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText });
            newTemp[item.gateId]['gate_pass_metrics'] = gateMetricData;
            if (item.eventType === 'ALERT') {
              alertFeedData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText });
              newTemp[item.gateId]['alert_feed'] = alertFeedData;
            }
          } else {
            gateMetricData = [];
            alertFeedData = [];
            gateMetricData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText });
            newTemp[item.gateId] = { label: item.gateId };
            newTemp[item.gateId]['gate_pass_metrics'] = gateMetricData;
            if (item.eventType === 'ALERT') {
              alertFeedData.push({ type: item.eventType, color: color, zone_name: item.zoneId, text: item.eventText });
              newTemp[item.gateId]['gate_alert_feed'] = alertFeedData;
            }
          }
        }
      } else {

        if (item.eventType === 'ALERT') {
          alertsFeedOnly.push({
            category: item.eventCatagory,
            type: item.eventType,
            color: 'red',
            zone_name: item.zoneId,
            text: item.eventText,
            deviceId: item.deviceId,
            deviceType: item.deviceType,
            timestamp: item.timestamp,
            cardId: item.cardId
          });
        }
        if (item.eventType === 'WARNING') {
          warnsFeedOnly.push({
            category: item.eventCatagory,
            type: item.eventType,
            color: 'yellow',
            zone_name: item.zoneId,
            text: item.eventText,
            deviceId: item.deviceId,
            deviceType: item.deviceType,
            timestamp: item.timestamp,
            cardId: item.cardId
          });
        }
      }
    });
    alertsAndWarnsFeed.push.apply(alertsAndWarnsFeed, alertsFeedOnly);
    alertsAndWarnsFeed.push.apply(alertsAndWarnsFeed, warnsFeedOnly);
    this.alertFeedMetrics.push({ alert_event_feed: alertsAndWarnsFeed });
    console.log(this.alertFeedMetrics);
    this.mapData.zonesDetail.forEach(zoneElement => {
      zoneElement.zoneAlerts = [];
      this.alertFeedMetrics[0].alert_event_feed.forEach(alertElement => {
        // tslint:disable-next-line: prefer-const
        let alertDateTZ = alertElement.timestamp + 'Z';
        let date = new Date(alertDateTZ);
        let alertTimestamp = date.getTime();
        let currenttime = new Date();
        let priortime = new Date(currenttime.setSeconds(currenttime.getSeconds() - 45));
        let priorTimestamp = priortime.getTime();
        if ((zoneElement.id === alertElement.zone_name) && (alertTimestamp > priorTimestamp)) {

          zoneElement.zoneAlerts.push(alertElement);

        }
      });
      zonedetails1.push(zoneElement);
    });
    this.mapData.zonesDetail = zonedetails1;
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
  openNewTable(dataArray) {
    this.openReportTable = dataArray[2];
    this.newTableData = dataArray[0];
    this.displayedColumns = dataArray[1];
  }

  closingTheTableNow(flag) {
    this.openReportTable = flag;
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
