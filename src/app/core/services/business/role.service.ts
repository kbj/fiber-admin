import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PageModel, ResponseModel } from '@shared/models/response.model'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { finalize } from 'rxjs'
import { NzMessageService } from 'ng-zorro-antd/message'

/**
 * 角色管理的service
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient, private messageService: NzMessageService) {}

  /**
   * 请求列表数据
   */
  getTableList<T>(query: NzSafeAny) {
    return this.http.post<ResponseModel<PageModel<T>>>('system/role/list', query)
  }

  /**
   * 删除数据
   * @param id  要删除的ID
   */
  deleteItems(id: number[]) {
    const messageId = this.messageService.loading('正在删除', { nzDuration: 10000 }).messageId
    return this.http
      .delete<ResponseModel<any>>(`system/role/${id}`)
      .pipe(finalize(() => this.messageService.remove(messageId)))
  }
}
