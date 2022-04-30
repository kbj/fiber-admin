import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { TableService } from '@services/common/role.service'
import { RoleListModel } from '@models/role.model'
import { PageModel } from '@models/response.model'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent implements OnInit {
  // 列表抬头搜索表单
  queryForm: FormGroup = this.fb.group({
    roleName: [null],
    roleCode: [null],
    createTime: [null]
  })
  // 角色列表数据
  apiData: PageModel<RoleListModel> = {
    current: 0,
    pageSize: 0,
    pages: 0,
    records: [],
    total: 0
  }
  headerName = ['角色编号', '角色名称', '角色编码']
  loading = false

  constructor(private fb: FormBuilder, private roleService: TableService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    //this.query()
  }

  /**
   * 请求列表数据
   */
  async query() {
    this.loading = true
    const roleLists = await this.roleService.getRoleList(this.queryForm.value)
    if (roleLists?.data) {
      this.apiData = roleLists.data
    }
    this.loading = false
  }
}
