import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http'

/**
 * HTTP请求选项封装
 */
export class HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[]
      }
  context?: HttpContext
  observe?: 'body'
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
      }
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
}
