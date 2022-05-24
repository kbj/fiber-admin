import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable } from 'rxjs'
import { NzMessageService } from 'ng-zorro-antd/message'
import Constant from '@core/config/constant.config'
import { UserStoreService } from '@store/user-store.service'
import cacheUtil from '@utils/cache.util'
import { NzModalService } from 'ng-zorro-antd/modal'
import { LoginService } from '@services/business/login.service'
import { OthersStoreService } from '@store/others-store.service'
import CustomHttpError from '@core/errors/http.error'

/**
 * 对接口返回值处理的拦截器
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private userStore: UserStoreService,
    private modalService: NzModalService,
    private loginService: LoginService,
    private otherStore: OthersStoreService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // 接口返回状态码处理
          const body = event.body
          if (!body || body.code !== 0) {
            throw new CustomHttpError(body.code, body.msg)
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
        if (err instanceof CustomHttpError) {
          switch (err.code) {
            case 40301:
              // 登录信息过期
              this.handleLoginExpire()
              break
            default:
              this.message.error(err.message)
          }
        }
        throw err
      })
    )
  }

  /**
   * 登录过期的提示
   */
  handleLoginExpire() {
    this.otherStore.globalSpin.next(false)
    this.modalService.warning({
      nzTitle: '系统提示',
      nzContent: '登录状态已过期，您可以继续留在该页面，或者重新登录',
      nzOkText: '重新登录',
      nzCancelText: '取消',
      nzOnOk: () => this.loginService.logout()
    })
  }
}
