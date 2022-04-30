import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { CommonTableKeyValueModel } from '@shared/models/common-table.model'
import { TableListComponent } from '@shared/components/table-list/table-list.component'
import Constant from '@core/config/constant.config'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent implements OnInit, AfterViewInit {
  // 列表抬头搜索表单
  queryForm: FormGroup = this.fb.group({
    roleName: [null],
    roleCode: [null],
    createAt: [null]
  })

  // 列表组件
  @ViewChild(TableListComponent)
  private tableListComponent!: TableListComponent

  // 列表参数结构定义
  tableKeyValue: CommonTableKeyValueModel[] = [
    {
      name: '编码',
      value: 'id',
      width: '8%'
    },
    {
      name: '角色名称',
      value: 'roleName'
    },
    {
      name: '角色编码',
      value: 'roleCode'
    },
    {
      name: '创建时间',
      value: 'createAt',
      type: 'date',
      format: Constant.YYYY_MM_DD_HH_MM_SS
    }
  ]

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.query()
  }

  /**
   * 请求列表数据
   */
  query() {
    this.tableListComponent.requestTableData(this.queryForm.value)
  }
}
