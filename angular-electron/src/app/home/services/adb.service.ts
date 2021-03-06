import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { CommonData } from './../models/models';
import { ADB_CHECK_URL, ADB_DEVICES_URL, ADB_PACKAGES_URL, ADB_PACKAGE_ACTION_URL } from './../models/apis_urls';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdbService {

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  checkADB(): Observable<CommonData> {
    return this.http.get<CommonData>(ADB_CHECK_URL)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );

  }

  getDeviceList(): Observable<CommonData> {
    return this.http.get<CommonData>(ADB_DEVICES_URL)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );

  }

  getDevicePackageList(): Observable<CommonData> {
    return this.http.get<CommonData>(ADB_PACKAGES_URL)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  getPackageDetails(packageStr: string): Observable<CommonData> {

    return this.http.get<CommonData>(ADB_PACKAGE_ACTION_URL, {
      headers:
        new HttpHeaders().set('Package-Name', packageStr)
    })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  uninstallPackage(packageStr: string): Observable<CommonData> {

    return this.http.delete<CommonData>(ADB_PACKAGE_ACTION_URL, {
      headers:
        new HttpHeaders().set('Package-Name', packageStr)
    })
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
}
