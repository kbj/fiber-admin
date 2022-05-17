import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { RoleService } from '@services/business/role.service'
import { PageModel } from '@shared/models/response.model'
import { finalize, takeUntil } from 'rxjs'
import pageUtil from '@utils/page.util'
import { NzMessageService } from 'ng-zorro-antd/message'
import { DestroyService } from '@services/common/destroy.service'
import { queryForm, tableConfig } from './config'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent implements OnInit {
  /**
   * 是否加载中
   */
  loading: boolean = false

  /**
   * 列表与搜索表单结构定义
   */
  tableKeyValue = tableConfig
  queryForm = queryForm

  /**
   * 角色列表数据
   */
  results: PageModel<NzSafeAny> = pageUtil.createEmptyPageModel()

  /**
   * 缓存上次查询列表的查询参数
   */
  cacheQueryFormValue: NzSafeAny = null

  constructor(
    private roleService: RoleService,
    private destroy: DestroyService,
    private messageService: NzMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  /**
   * 请求列表数据
   */
  query(formValue: NzSafeAny) {
    this.cacheQueryFormValue = formValue
    this.loading = true
    // 时间处理，时分秒都置零
    if (formValue.createAt && formValue.createAt.length > 0) {
      formValue.createAt[0] = (formValue.createAt[0] as Date).setHours(0, 0, 0, 0)
      formValue.createAt[1] = (formValue.createAt[1] as Date).setHours(0, 0, 0, 0)
    }
    this.roleService
      .getTableList(formValue)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.loading = false))
      )
      .subscribe((resp) => {
        this.results = resp.data
        this.cdr.markForCheck()
      })
  }

  /**
   * 删除条目功能
   */
  deleteItem(id: number[]) {
    this.roleService
      .deleteItems(id)
      .pipe(takeUntil(this.destroy))
      .subscribe((resp) => {
        if (resp.code === 0) {
          this.messageService.success('删除成功')
          this.refreshQuery()
        }
      })
  }

  /**
   * 刷新列表
   */
  refreshQuery() {
    this.query(this.cacheQueryFormValue)
  }
}
