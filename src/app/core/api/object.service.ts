import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  createObject(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/object/create`, body);
  }

  updateObject(body: any): Observable<any> {
    return this.http.patch(this.apiUrl + '/api/object/update', body)
  }

  getObjectDetail(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/object/object-detail/${id}`)
  }

  listObjectByUnit(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/object/get-all-object-from-unit`, body);
  }

  getMemberObject(id: string): Observable<any> {
    console.log('Getting members for object:', id);
    return this.http.get(this.apiUrl + `/api/object/get-all-member/${id}`)
      .pipe(
        tap((response: any) => {
          console.log('API response from getMemberObject:', response);
          if (response?.data) {
            console.log('Member data:', response.data);
          }
        })
      );
  }

  deleteObject(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + `/api/object/delete/${id}`);
  }

  deleteMemberObject(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + `/api/object/delete-member/${id}`);
  }
}
