import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PageModel, ResponseModel } from '@shared/models/response.model'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { lastValueFrom } from 'rxjs'
import { NzMessageService } from 'ng-zorro-antd/message'

/**
 * 封装列表相关的service
 */
@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http: HttpClient, private messageService: NzMessageService) {}

  /**
   * 请求列表数据
   */
  getTableList<T>(url: string, query: NzSafeAny) {
    return lastValueFrom(this.http.post<ResponseModel<PageModel<T>>>(url, query))
  }

  /**
   * 删除数据
   * @param url 删除接口地址
   * @param id  要删除的ID
   */
  deleteItems(url: string, id: number[]) {
    const messageId = this.messageService.loading('正在删除', { nzDuration: 10000 }).messageId
    return lastValueFrom(this.http.delete<ResponseModel<any>>(url + `/${id}`)).finally(() =>
      this.messageService.remove(messageId)
    )
  }
}
