import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import {ChartModule} from 'angular-highcharts';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';
import {NgxPopper} from 'angular-popper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {ToolbarComponent} from './component/toolbar/toolbar.component';
import {sideBarComponent} from './component/sidebar/sideBar.component';
import {mapComponent} from './component/map/map.component';
import {securityOverviewComponent} from './component/securityOverview/securityOverview.component';
import {EventSummaryComponent} from './component/eventSummary/eventSummary.component';
import {GateMetricsComponent} from './component/gateMetrics/gateMetrics.component';
import {EntrySummaryComponent} from './component/entrySummary/entrySummary.component';
import {CctvCameraComponent} from './component/cctvCamera/cctvCamera.component';
import {FooterComponent} from './component/footer/footer.component';
import {TowerEntryComponent} from './component/towerEntry/towerEntry.component';
import {VisitorMetricsComponent} from './component/visitorMetrics/visitorMetrics.component';
import {DashboardComponent} from './dashboard/dashboard.component';


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        sideBarComponent,
        mapComponent,
        securityOverviewComponent,
        EventSummaryComponent,
        GateMetricsComponent,
        EntrySummaryComponent,
        CctvCameraComponent,
        FooterComponent,
        TowerEntryComponent,
        VisitorMetricsComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MalihuScrollbarModule.forRoot(),
        NgxPopper,
        NgbModule,
        AmChartsModule,
        ChartModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
