import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { CommonTableKeyValueModel, CommonTableSearchFormModel } from '@shared/models/common.model'
import { TableListComponent } from '@shared/components/table-list/table-list.component'
import Constant from '@core/config/constant.config'
import { NzSafeAny } from 'ng-zorro-antd/core/types'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent implements OnInit {
  // 列表组件
  @ViewChild(TableListComponent)
  private tableListComponent!: TableListComponent

  // 是否加载中
  loading: boolean = false

  // 列表参数结构定义
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

  // 列表搜索表单
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

  constructor() {}

  ngOnInit(): void {}

  /**
   * 请求列表数据
   */
  query(formValue: NzSafeAny) {
    // 时间处理，时分秒都置零
    if (formValue.createAt && formValue.createAt.length > 0) {
      const startTime = formValue.createAt[0] as Date
      const endTime = formValue.createAt[1] as Date
      startTime.setHours(0, 0, 0, 0)
      endTime.setHours(0, 0, 0, 0)
      formValue.createAt[0] = startTime
      formValue.createAt[1] = endTime
    }
    this.tableListComponent.requestTableData(formValue)
  }
}
