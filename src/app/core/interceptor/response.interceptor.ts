import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable } from 'rxjs'
import { NzMessageService } from 'ng-zorro-antd/message'
import Constant from '@core/config/constant.config'
import { UserStoreService } from '@store/user-store.service'
import cacheUtil from '@utils/cache.util'

/**
 * 对接口返回值处理的拦截器
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private message: NzMessageService, private userStore: UserStoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // 接口返回状态码处理
          const body = event.body
          if (!body || body.code !== 0) {
            throw new Error(body.msg)
          }
          // 判断返回是否有token，来更新Token
          const authorization = event.headers.get(Constant.HEADER_Authorization)
          if (authorization) {
            this.userStore.token.next(authorization)

            // 更新本地缓存
            cacheUtil.setCache(Constant.CACHE_KEY_AUTHORIZATION, authorization, !this.userStore.rememberMe.getValue())
          }
        }
        return event
      }),
      catchError((err) => {
        this.message.error(err.message)
        throw err
      })
    )
  }
}
