import { AddressRequest } from "./addressRequest";
import { AdditionalVisitorDetail } from "./additionalVisitorDetail";
import {VehicleDetail} from './vehicleDetail';
export class VisitorVisitDetailView {
    
   

    name:string;
   
   mobile:string;
   
   email:string;
   
   age:Number;
   
     gender:string;
   
     guestPic:any;
   
     guestThumbnailPic:string;
   
     fromAddress:AddressRequest;
   
     visitId:string; 
   
     guestType:string;
   
     actualInTime:string;
   
     actualOutTime:string;
   
     expectedIn:string;
      
     expectedOut:string;
   
     vehicles:Array<VehicleDetail>;

     otherGuests:AdditionalVisitorDetail[];
   
   
   
     toAddress:AddressRequest;
   
     targetZone:string;
   
     targetSite:string;
   
     visitorVisitStatus:string;
   
   issuedCardId:string;


}