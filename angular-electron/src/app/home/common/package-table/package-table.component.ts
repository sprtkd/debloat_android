import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-table',
  templateUrl: './package-table.component.html',
  styleUrls: ['./package-table.component.scss']
})
export class PackageTableComponent implements OnInit {
  @Input() packageList: string[];
  constructor() { }

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
    console.log(retcolor)
    return retcolor;
  }




}
