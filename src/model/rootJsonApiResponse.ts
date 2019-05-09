import { SecurityGuardView } from "./securityGuardView";
import { VisitorVisitDetailView } from "./visitorVisitDetailView";
import { EventSummaryView } from "./eventSummaryView";

export class RootJsonApiResponse{

    securityGuardsSummary:SecurityGuardView[];
    visitorSummary:VisitorVisitDetailView[];
    eventSummary:EventSummaryView[];


}