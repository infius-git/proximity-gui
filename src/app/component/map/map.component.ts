import { Component, OnInit,Input,OnChanges,SimpleChanges} from '@angular/core';
import {DomSanitizer,SafeStyle,SafeUrl} from '@angular/platform-browser';
import {mapData} from '../../../proximity';
@Component({
  selector: 'main-map',
  templateUrl: './map.html',
  styleUrls: ['./map.component.css']
})
export class mapComponent implements OnInit,OnChanges {
@Input() mapData:mapData;
@Input() pathData:any;
 image:SafeUrl;
 imagestyle:SafeStyle;
 drawPath:boolean = false;
 pathpoints:any;
 zoneImage:SafeUrl;
 zoneName: string;
  constructor(private sanitization:DomSanitizer) { }

  ngOnInit() {
    this.image = this.sanitization.bypassSecurityTrustUrl(this.mapData.baseMapImage);
    this.imagestyle = this.sanitization.bypassSecurityTrustStyle(`url(${this.mapData.baseMapImage})`);
  }
  ngOnChanges(changes: SimpleChanges){
    if(!!changes.pathData && !changes.pathData.firstChange){
      if(changes.pathData.currentValue.pathDetail.length>0){
    this.drawPath = true;
    this.pathpoints=changes.pathData.currentValue;
      }
    }
  }
  openZoneImage(zone):void{
    this.drawPath = false;
    this.zoneName = zone.name;
    this.zoneImage = this.sanitization.bypassSecurityTrustUrl(zone.zoneImage);
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
  }
  closePopUp():void{
  document.getElementById('light').style.display='none';
  document.getElementById('fade').style.display='none';
 }
}
