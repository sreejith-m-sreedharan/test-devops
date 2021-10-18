import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(public http: HttpClient) {}
  isMobile() {
    return window.screen.availWidth <= 768;
  }
  checkAvailable(url) {
    return this.http.get(url, {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      responseType: 'text',
    });
  }
}
