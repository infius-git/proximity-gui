
export class title{
    icon:string;
    url:string;
    hover_text:string;
}
export class accessLinks{
    link_label:string;
    link_url:string;
    link_target:string;
    icon:string;
}
export class topBar {
    product_title:title ;
    access_links:Array<accessLinks>;
}
export class sideBar {
    open: boolean;
    scroll_type: string;
    access_links: Array<accessLinks>;
}
export class grid{
    row:Array<any>;
}
export class gridCanvas{
    TBD:string;
    grid:Array<grid>;
}
export class teamStats{
    allocations:any;
    count_bars:any;
}
export class securityOverview{
    counts:any;
    team_stats:teamStats;
}
export class eventSummary{
    event_name:string;
    event_count:number;
    event_icon:string;
}
export class gatePass{
    type:string;
    color:string;
    zone_name:string;
    text:string;
}
export class monitorMetrics{
    label:string;
    gate_pass_metrics:Array<gatePass>;
    alert_feed:Array<gatePass>;
}
export class activity{
    event_name:string;
    event_count:number;
    event_icon:string;
}
export class progress{
    name:string;
    type:string;
    data:string;
}
export class entryrGraph{
    name:string;
    color:string;
    data:string;
}
export class entry{
    value:string;
    class:string;
}
export class visitChart{
    country:string
    visits:string;
    color:string;
}
export class entrySummary{
    activity_summary:Array<activity>;
    progress_summary:Array<progress>;
    entry_summary_graph:Array<entryrGraph>;
    visit_graph:Array<visitChart>;
    entry_data:Array<entry>;
}
export class widgets{
    security_overview:securityOverview;
    event_summary:Array<eventSummary>;
    monitor_metrics:Array<monitorMetrics>;
    entry_summary:entrySummary;
    visitor_metrics:visitorMetrics;
    tower_entry:towerEntry;
    anomaly_summary:anomalySummary;
    visitors_scroll:any;
}
export class anomalyData{
    country:string;
    visits:number;
    color:string;
}
export class anomalySummary{
    TBD:string;
    anomaly_data:Array<anomalyData>;
}
export class towerEntry{
    entry_types:Array<entryTypes>;
    parking_metrics:parkingMetrics
}
export class entryTypes{
    type:string;
    count_per:string;
}
export class pMetrics{
line:string;
slots:Array<any>;
}
export class parkingMetrics{
    TBD:string;
    metrics:Array<pMetrics>;
}

export class mainPanel{
    grid_canvas:any;
    widgets:widgets;
}
export class metrics{
    name:string;
    mobile:string;
    vehicle_no:string;
    make:string;
    arrival_time:string;
    exp_out_time:string;
    parking_allocation_time:string;
    barcode:string;
    current_location:string;
    where_to_go:string;
    img_url:string;
}
export interface visitorMetrics{
    TBD:string;
    data_labels?:Array<any>;
    metrics:Array<metrics>;
}
export class proximity{
    top_bar:topBar;
    side_bar:sideBar;
    main_panel:mainPanel;
    bottom_panel:bottomPanel;
}
export class bottomPanel{
 
}


export class mapData{
    id:string;
    name: string;
    baseMapImage: string;
    baseMapImageResolution: Array<any>;
    zonesDetail: Array<zonesDetail>;
}

export class zonesDetail{
    id:string;
    name:string;
    color:string;
    polygon:any;
}