import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-phonepic',
  templateUrl: './phonepic.component.html',
  styleUrls: ['./phonepic.component.scss']
})
export class PhonepicComponent implements OnInit {
  @Input() url: string;
  constructor() { }

  ngOnInit(): void {
  }

}
