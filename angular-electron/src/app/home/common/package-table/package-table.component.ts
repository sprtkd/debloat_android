import { Component, Input, OnInit } from '@angular/core';
import { searchGoogle, copyToClipboard } from '../../models/utils';
import { HomeComponent } from '../../home.component';
import { AdbService } from 'app/home/services/adb.service';
import { CommonData } from 'app/home/models/models';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-package-table',
  templateUrl: './package-table.component.html',
  styleUrls: ['./package-table.component.scss']
})
export class PackageTableComponent implements OnInit {
  @Input() packageList: string[];
  constructor(private homeComponent: HomeComponent, private adbService: AdbService, 
    public ngxSmartModalService: NgxSmartModalService) { }
  det = null;
  ngOnInit(): void {
  }
  getCompanyName(packageStr: string) {
    let retStr: string = '';
    let lst = packageStr.split('.');
    if (lst.length >= 2) {
      retStr = lst[1];
    } else if (lst.length == 1) {
      retStr = lst[0];
    } else {
      retStr = 'android';
    }
    return retStr.substring(0, 7);
  }

  hashCode(str: string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    let retcolor =  "00000".substring(0, 6 - c.length) + c;
    retcolor = '#'+retcolor;
    return retcolor;
  }

  googleSearch(packStr: string) {
    searchGoogle(packStr);
  }

  copyToClipboardWrap(packStr: string) {
    copyToClipboard(packStr);
    new Notification('Copied To Clipboard', {body: "Copied: "+ packStr});
  }

  getInfo(packStr: string) {
    this.homeComponent.spinnerStart();
    this.adbService.getPackageDetails(packStr)
      .subscribe((data: CommonData) => {
        this.det = data.data;
        this.ngxSmartModalService.getModal('myModal').open()
      },
        error => {
          const options = {
            body: error
          };
          new Notification('ADB Update Failed', options);
        }).add(() => {
          this.homeComponent.spinnerStop();
        });
  }

  uninstallApp(packStr: string) {
    this.homeComponent.spinnerStart();
    this.adbService.uninstallPackage(packStr)
      .subscribe((data: CommonData) => {
        let isUninstalled: boolean = data.data.uninstalled;
        const options = {
          body: packStr+' | '+data.data.message
        };
        new Notification(isUninstalled ? 'Uninstall Successful':'Uninstall Failed', options);
      },
        error => {
          const options = {
            body: error
          };
          new Notification('ADB Update Failed', options);
        }).add(() => {
          this.homeComponent.spinnerStop();
        });
    
  }



}
