import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { registerModel } from '../model/account.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;
  
  // Biến tĩnh để tránh nhiều lần đăng xuất cùng lúc
  private static isLoggingOut = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private OAuthService: OAuthService,
  ) {}

  register(body: registerModel): Observable<any> {
    return this.http.post(this.apiUrl + '/api/user/create', body);
  }

  logout(): void {
    // Kiểm tra xem đã đang trong quá trình đăng xuất chưa
    if (AuthService.isLoggingOut) {
      return;
    }
    
    AuthService.isLoggingOut = true;
    
    // Thực hiện đăng xuất
    this.storageService.clearStorage();
    this.OAuthService.logOut();
    this.router.navigate(['/login']);
    
    // Đặt lại trạng thái sau một khoảng thời gian
    setTimeout(() => {
      AuthService.isLoggingOut = false;
    }, 3000);
  }

  handleOAuthLogin(token: string, email: string): Observable<any> {
    const body = { token, email };
    return this.http.post(this.apiUrl + '/api/user/create', body);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(this.apiUrl + '/connect/userinfo');
  }
}
