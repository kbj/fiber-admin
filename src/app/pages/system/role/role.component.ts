import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { CommonTableKeyValueModel, CommonTableSearchFormModel } from '@shared/models/common.model'
import Constant from '@core/config/constant.config'
import { NzSafeAny } from 'ng-zorro-antd/core/types'
import { RoleService } from '@services/business/role.service'
import { PageModel } from '@shared/models/response.model'
import { finalize, takeUntil } from 'rxjs'
import pageUtil from '@utils/page.util'
import { NzMessageService } from 'ng-zorro-antd/message'
import { DestroyService } from '@services/common/destroy.service'

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
   * 列表参数结构定义
   */
  tableKeyValue: CommonTableKeyValueModel[] = [
    {
      name: '编码',
      value: 'id',
      align: 'center',
      showSort: true,
      sortFn: (a: any, b: any) => a.id - b.id
    },
    {
      name: '角色名称',
      value: 'roleName',
      align: 'center'
    },
    {
      name: '角色编码',
      value: 'roleCode',
      align: 'center'
    },
    {
      name: '创建时间',
      value: 'createAt',
      type: 'date',
      align: 'center',
      format: Constant.YYYY_MM_DD_HH_MM_SS
    }
  ]

  /**
   * 列表搜索表单
   */
  queryForm: CommonTableSearchFormModel[] = [
    {
      name: '角色名称',
      value: 'roleName',
      type: 'input'
    },
    {
      name: '角色编码',
      value: 'roleCode',
      type: 'input'
    },
    {
      name: '创建时间',
      value: 'createAt',
      type: 'date-range',
      format: 'yyyy/MM/dd'
    }
  ]

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
