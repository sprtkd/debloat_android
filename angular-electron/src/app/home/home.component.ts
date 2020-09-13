import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonData, DeviceInfo } from './models/models';
import { AdbService } from './services/adb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adb_status: Boolean = false;
  deviceInfo : DeviceInfo = null;
  constructor(private router: Router, private adbService: AdbService) { }

  ngOnInit(): void { }

  get_adb_status() {
    this.adbService.checkADB()
      .subscribe((data: CommonData) => {
        this.adb_status = data.data;
      },
        error => {
          const options = {
            body: error
        };
          new Notification('ADB Update Failed', options);
        });

  }

  get_adb_device() {
    this.adbService.getDeviceList()
      .subscribe((data: CommonData) => {
        this.deviceInfo = data.data;
      },
        error => {
          const options = {
            body: error
        };
          new Notification('ADB Update Failed', options);
        });
  }

}
