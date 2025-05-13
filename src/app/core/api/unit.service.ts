import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { registerModel } from '../model/account.model';
import {
  createUnitModel,
  getListUnitModel,
  updateUnitModel,
} from '../model/unit.model';

@Injectable({
  providedIn: 'root',
})
export class unitService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getListUnits(body: getListUnitModel): Observable<any> {
    return this.http.post(this.apiUrl + '/api/unit/viewall-unit', body);
  }

  getListUnitsByTenant(idTenant: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/unit/get-all-unit/${idTenant}`);
  }

  getListUnitByParentUnit(idParent: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/unit/get-sub-unit/${idParent}`);
  }

  createUnit(body: createUnitModel): Observable<any> {
    console.log('UnitService - createUnit request body:', JSON.stringify(body));
    return this.http.post(this.apiUrl + '/api/unit/create', body).pipe(
      tap(
        response => console.log('UnitService - createUnit success response:', response),
        error => {
          console.error('UnitService - createUnit error response:', error);
          if (error.error && error.error.title) {
            console.error('Error details:', error.error.title);
          }
          if (error.error && error.error.detail) {
            console.error('Error detail:', error.error.detail);
          }
        }
      )
    );
  }
  updateUnit(body: any): Observable<any> {
    console.log('UnitService - updateUnit request body:', JSON.stringify(body));
    return this.http.patch(this.apiUrl + '/api/unit/update', body).pipe(
      tap(
        response => console.log('UnitService - updateUnit success response:', response),
        error => {
          console.error('UnitService - updateUnit error response:', error);
          if (error.error && error.error.title) {
            console.error('Error details:', error.error.title);
          }
          if (error.error && error.error.detail) {
            console.error('Error detail:', error.error.detail);
          }
        }
      )
    );
  }

  deleteUnit(idUnit: string): Observable<any> {
    return this.http.delete(this.apiUrl + `/api/unit/delete/${idUnit}`);
  }
  getDetailUnit(idUnit: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/unit/detail/${idUnit}`);
  }
  getMember(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/unit/get-member`, body);
  }

  getMemberTenant(name: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/user/${name}`);
  }

  getMemberUnitFather(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/${id}/member-list`);
  }

  getMemberUnitChil(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/unitmember/Get-member-from-unit`, body);
  }

  getMemberList(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/tenant/admin/list-user`, body);
  }
  addMemberToUnit(body: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/unit/add-member-to-unit`, body);
  }

  getListObjectsByUnit(unitId: string) {
    return this.http.get(`${environment.API_URL}/api/objects/by-unit/${unitId}`);
  }
}
