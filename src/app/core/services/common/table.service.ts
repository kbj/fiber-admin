import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {PageModel, ResponseModel} from '@shared/models/response.model'
import {NzSafeAny} from 'ng-zorro-antd/core/types'
import {lastValueFrom} from 'rxjs'

/**
 * 封装列表相关的service
 */
@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient) {}

  /**
   * 请求列表数据
   */
  getTableList<T>(url: string, query: NzSafeAny) {
    return lastValueFrom(this.http.post<ResponseModel<PageModel<T>>>(url, query))
  }
}
