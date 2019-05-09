import { Component, OnInit,Input } from '@angular/core';
import {eventSummary} from '../../../proximity';
import {EventSummaryView} from '../../../model/eventSummaryView';
@Component({
  selector: 'event-summary',
  templateUrl: './eventSummary.html',
  styleUrls: ['./eventSummary.component.css']
})
export class EventSummaryComponent implements OnInit {
@Input() eventSummary:Array<EventSummaryView>;
@Input() eventData:any;
// eventData:any = [];

  constructor() { }

  ngOnInit() {
  
  }

}
