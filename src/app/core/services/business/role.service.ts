import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {PageModel, ResponseModel} from '@models/response.model'
import {NzSafeAny} from 'ng-zorro-antd/core/types'
import {RoleListModel} from '@models/role.model'
import {lastValueFrom} from 'rxjs'

/**
 * 角色管理相关的service
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {}

  /**
   * 请求角色列表数据
   */
  getRoleList(query: NzSafeAny) {
    return lastValueFrom(this.http.post<ResponseModel<PageModel<RoleListModel>>>('system/role/list', query))
  }
}
