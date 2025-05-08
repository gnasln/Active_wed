import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createTenantModel, getListTenantModel } from '../model/tenant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getListTenant(): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/get-all-from-owner`);
  }

  getListTenantByAdmin(): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/get-all-by-admin`);
  }

  getListTenantFromMember(): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/get-all-from-member`);
  }

  createTenant(body: createTenantModel): Observable<any> {
    return this.http.post(this.apiUrl + '/api/tenant/create', body);
  }

  getDetailTenant(idTenant: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/tenant/tenant-detail/${idTenant}`);
  }

  updateTenant(body: any): Observable<any> {
    console.log('TenantService - updateTenant request body:', body);
    
    // Clone body để không ảnh hưởng đến dữ liệu gốc
    const modifiedBody = {...body};
    
    // Thử nghiệm: Thêm các trường khác có thể là tên thật của trường "name" trên API
    if (modifiedBody.name) {
      modifiedBody.title = modifiedBody.name;        // Thử với "title"
      modifiedBody.tenantName = modifiedBody.name;   // Thử với "tenantName"
      // Tên trường trong form là tenantTitle, đã thêm ở component
      
      // Dựa vào response từ API, có thể backend cần một trong các trường sau
      modifiedBody.displayName = modifiedBody.name;  // Thử với "displayName"
      modifiedBody.organizationName = modifiedBody.name; // Thử với "organizationName"
    }
    
    console.log('TenantService - modified request body:', modifiedBody);
    return this.http.patch(this.apiUrl + '/api/tenant/update', modifiedBody)
  }

  deleteTenant(idTenant: string): Observable<any> {
    return this.http.delete(this.apiUrl + `/api/tenant/delete/${idTenant}`);
  }
}
