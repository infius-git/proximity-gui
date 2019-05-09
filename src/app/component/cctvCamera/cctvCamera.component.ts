import { Component, OnInit,Input } from '@angular/core';
import {sideBar} from '../../../proximity';
@Component({
  selector: 'cctv-camera',
  templateUrl: './cctvCamera.html'
})
export class CctvCameraComponent implements OnInit {
@Input() sideBarData:sideBar;
  constructor() { }

  ngOnInit() {
  }

}
