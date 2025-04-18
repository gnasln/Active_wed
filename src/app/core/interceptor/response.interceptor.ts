import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../api/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  // Biến tĩnh để theo dõi trạng thái đăng xuất
  private static isLoggingOut = false;
  
  constructor(
    private router: Router,
    private message: NzMessageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log('error!');
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error Event');
          } else {
            console.log(`error status : ${error.status} ${error.error}`);
            if(error.status === 400) {
              this.message.info(error.error);
            } else if (error.status === 200) {
              this.message.info('Tải lên thành công');
            }
            switch (error.status) {
              case 401:
                // Kiểm tra xem đã đang trong quá trình đăng xuất chưa
                if (!ResponseInterceptor.isLoggingOut) {
                  ResponseInterceptor.isLoggingOut = true;
                  this.message.info('Hết phiên đăng nhập');
                  this.authService.logout();
                  
                  // Đặt lại trạng thái sau một khoảng thời gian
                  setTimeout(() => {
                    ResponseInterceptor.isLoggingOut = false;
                  }, 3000);
                }
                break;
              case 500:
                this.message.info('Lỗi hệ thống');
                break;
            }
          }
        }
        return throwError(error.message);
      })
    );
  }
}
