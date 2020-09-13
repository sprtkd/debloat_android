import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { CommonData } from './../models/models';
import { ADB_CHECK_URL, ADB_DEVICES_URL } from './../models/apis_urls';
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
}
