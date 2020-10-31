import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonData, DeviceInfo } from './models/models';
import { AdbService } from './services/adb.service';
import { version } from './../../../package.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public appVersion: string = version;
  isSpinning: Boolean = false;
  adb_status: Boolean = false;
  deviceInfo: DeviceInfo = null;
  packageList: string[] = null;
  searchVal: string = "";
  filteredPackageList: string[] = null;
  constructor(private router: Router, private adbService: AdbService) { }

  resetSearch() {
    this.searchVal = "";
  }

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
          this.resetSearch();
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
          this.resetSearch();
        });
  }

  get_adb_packages() {
    this.spinnerStart();
    this.adbService.getDevicePackageList()
      .subscribe((data: CommonData) => {
        this.packageList = data.data;
        this.filteredPackageList = this.packageList;
      },
        error => {
          const options = {
            body: error
          };
          new Notification('ADB Update Failed', options);
        }).add(() => {
          this.spinnerStop();
          this.resetSearch();
        });

  }

  filterPackages(searchText: string) {
    if(this.packageList == null) {
      return null;
    }
    this.filteredPackageList = this.packageList.filter(s => s.includes(searchText),[]);
  }

  spinnerStart() {
    this.isSpinning = true;
  }

  spinnerStop() {
    this.isSpinning = false;
  }

}
