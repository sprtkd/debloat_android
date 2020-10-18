import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { PhonepicComponent } from './common/phonepic/phonepic.component';
import { PackageTableComponent } from './common/package-table/package-table.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [HomeComponent, PhonepicComponent, PackageTableComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule,
    NgxSmartModalModule.forRoot()]
})
export class HomeModule {}
