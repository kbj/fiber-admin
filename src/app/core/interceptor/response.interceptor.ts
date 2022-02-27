import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {catchError, map, Observable, retry} from 'rxjs'
import {NzMessageService} from 'ng-zorro-antd/message'

/**
 * 对接口返回值处理的拦截器
 */
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private message: NzMessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body
          if (!body || body.code !== 0) {
            throw new Error(body.msg)
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
