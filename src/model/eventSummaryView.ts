export class EventSummaryView{

    siteId:String;
    zoneId:string;
    deviceId:string;
    deviceType:string;
    relayId:string;
    gateId:string;
    cardId:string;
    eventCatagory:string; //CARD_READING, BUMP_BEARER,QR_SCAN,VISITS
    eventType:string;//Info, Alert, Warning
    eventText:string;
    timestamp:string;
    eventRef:string;//Reference to Other table
  
    eventInfo  = new Map<object, string>(); 






}