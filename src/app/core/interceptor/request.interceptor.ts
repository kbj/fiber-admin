import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {UserStoreService} from '@store/user-store.service'

/**
 * 为每个HTTP请求添加基础请求地址的拦截器
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private userStore: UserStoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let baseUrl = environment.apiBaseUrl

    const newReq = req.clone({
      // 添加baseUrl
      url: baseUrl + req.url,
      // 添加请求头
      headers: req.headers.set('Authorization', 'Bearer ' + this.userStore.token.getValue())
    })

    return next.handle(newReq)
  }
}
