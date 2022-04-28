import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { RoleService } from '@services/business/role.service'
import { PageModel, ResponseModel } from '@models/response.model'
import { RoleListModel } from '@models/role.model'

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
  roleLists: ResponseModel<PageModel<RoleListModel>> | undefined

  constructor(private fb: FormBuilder, private roleService: RoleService) {}

  ngOnInit(): void {}

  /**
   * 请求列表数据
   */
  async query() {
    this.roleLists = await this.roleService.getRoleList(this.queryForm.value)
  }
}
