import { SecurityGuardView } from "./securityGuardView";
import { VisitorVisitDetailView } from "./visitorVisitDetailView";
import { EventSummaryView } from "./eventSummaryView";

export class RootJsonApiResponse{

    securityGuardsSummary:SecurityGuardView[];
    visitorSummary:VisitorVisitDetailView[];
    eventSummary:EventSummaryView[];
    anomaly_summary: any;
    entry_summary: any;
    security_overview: any;
    tower_entry: any;
}