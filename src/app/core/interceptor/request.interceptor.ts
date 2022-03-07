import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import localCache from '@utils/cache.util'
import Constant from '../config/constant.config'

/**
 * 为每个HTTP请求添加基础请求地址的拦截器
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let baseUrl
    // 获取当前是否是开发环境
    if (environment.production) {
      // 生产环境
      baseUrl = 'http://127.0.0.1:8081/'
    } else {
      // 开发环境
      baseUrl = 'http://127.0.0.1:8081/'
    }

    // 获取保存的请求头
    let authorization = localCache.getCache(Constant.LocalStorageAuthorizationKey)
    if (!authorization) {
      authorization = ''
    }

    const newReq = req.clone({
      // 添加baseUrl
      url: baseUrl + req.url,
      // 添加请求头
      headers: req.headers.set('Authorization', authorization + '')
    })

    return next.handle(newReq)
  }
}