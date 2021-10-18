import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment as $ENV } from '../../../../environments/environment';
import { Authenticate } from '../models/authenticate';
import { User } from '../models/user';
import { FundRequest } from '../models/fundrequest';
import { Profile } from '../models/profile';
import { Verification } from '../models/verification';

@Injectable()
export class RestApiService {
  
  constructor(public http: HttpClient) {
    
  }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJydWJ5am9pc29uIiwiZXhwIjoxNTkwMDg4NDE3LCJpYXQiOjE1OTAwNzA0MTd9.akhd_-GOZkXxDHbSZxsbpU4g51Ny_OM-olJ_1ncq_vFSxT5kuNr-LpFaC7JJXwFra1wXuPp09qZ6eFjazb5ifw'
    }),
  };

  authenticateUser(authenticate): Observable<Authenticate> {
    return this.http
      .post<Authenticate>(`${$ENV.investorUrl}/authenticate`, JSON.stringify(authenticate), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  registerUser(userCreateDetails): Observable<User> {
    return this.http
      .post<User>(`${$ENV.investorUrl}/registeruser`, JSON.stringify(userCreateDetails), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUserProfile(id): Observable<Profile> {
    return this.http
      .get<Profile>(`${$ENV.investorUrl}/userprofile/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  uploadFile(profileCreateDetails): Observable<Profile> {
    return this.http
      .post<Profile>(`${$ENV.investorUrl}/uploadFile/`, JSON.stringify(profileCreateDetails), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createUserProfile(profileCreateDetails): Observable<Profile> {
    return this.http
      .post<Profile>(`${$ENV.investorUrl}/userprofile/create`, JSON.stringify(profileCreateDetails), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateUserProfile(profileCreateDetails): Observable<Profile> {
    return this.http
      .post<Profile>(`${$ENV.investorUrl}/userprofile/create`, JSON.stringify(profileCreateDetails), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createFundRequest(profileCreateDetails): Observable<FundRequest> {
    return this.http
      .post<FundRequest>(
        `${$ENV.fundmanagerUrl}/fundrequests/create`,
        JSON.stringify(profileCreateDetails),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  updateFundRequest(id, profileCreateDetails): Observable<FundRequest> {
    return this.http
      .put<FundRequest>(
        `${$ENV.fundmanagerUrl}/fundrequests/${id}`,
        JSON.stringify(profileCreateDetails),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getFundRequests(): Observable<FundRequest> {
    return this.http
      .get<FundRequest>(`${$ENV.fundmanagerUrl}/fundrequests/`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getFundRequest(id): Observable<FundRequest> {
    return this.http
      .get<FundRequest>(`${$ENV.fundmanagerUrl}/fundRequests/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  /* createVerification(profileCreateDetails): Observable<Verification> {
    return this.http.post<Verification>(this.blockchainurl + 'FundManager', JSON.stringify(profileCreateDetails),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }*/

  createVerification(profileCreateDetails): Observable<Verification> {
    return this.http
      .post<Verification>(
        `${$ENV.fundmanagerUrl}/verification/create`,
        JSON.stringify(profileCreateDetails),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
