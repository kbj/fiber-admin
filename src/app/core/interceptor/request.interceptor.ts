import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, retry, timeout } from 'rxjs'
import { environment } from '../../../environments/environment'
import { UserStoreService } from '@store/user-store.service'
import Constant from '@core/config/constant.config'

/**
 * 为每个HTTP请求添加基础请求地址的拦截器
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private userStore: UserStoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let baseUrl = environment.apiBaseUrl

    // 处理baseUrl与header
    let newReq
    const token = this.userStore.token.getValue()
    if (token) {
      newReq = req.clone({
        // 添加baseUrl
        url: baseUrl + req.url,
        // 添加请求头
        headers: req.headers.set(Constant.HEADER_Authorization, token)
      })
    } else {
      newReq = req.clone({
        // 添加baseUrl
        url: baseUrl + req.url
      })
    }

    return next.handle(newReq).pipe(timeout(Constant.HTTP_DEFAULT_TIMEOUT), retry(1))
  }
}
