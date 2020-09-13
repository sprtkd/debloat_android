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
  isSpinning: Boolean = false;
  adb_status: Boolean = false;
  deviceInfo: DeviceInfo = null;
  packageList: string[] = null;
  constructor(private router: Router, private adbService: AdbService) { }

  ngOnInit(): void { }

  get_adb_status() {
    this.spinnerStart();
    this.adbService.checkADB()
      .subscribe((data: CommonData) => {
        this.adb_status = data.data;
      },
        error => {
          const options = {
            body: error
          };
          new Notification('ADB Update Failed', options);
        }).add(() => {
          this.spinnerStop();
        });

  }

  get_adb_device() {
    this.spinnerStart();
    this.adbService.getDeviceList()
      .subscribe((data: CommonData) => {
        this.deviceInfo = data.data;
      },
        error => {
          const options = {
            body: error
          };
          new Notification('ADB Update Failed', options);
        }).add(() => {
          this.spinnerStop();
        });
  }

  get_adb_packages() {
    this.spinnerStart();
    this.adbService.getDevicePackageList()
      .subscribe((data: CommonData) => {
        this.packageList = data.data;
      },
        error => {
          const options = {
            body: error
          };
          new Notification('ADB Update Failed', options);
        }).add(() => {
          this.spinnerStop();
        });

  }

  spinnerStart() {
    this.isSpinning = true;
  }

  spinnerStop() {
    this.isSpinning = false;
  }

}
