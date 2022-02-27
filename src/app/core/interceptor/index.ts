import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {RequestInterceptor} from './request.interceptor'
import {ResponseInterceptor} from './response.interceptor'

/**
 * 统一提供HTTP的请求拦截器导出
 */
export default [
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
]
