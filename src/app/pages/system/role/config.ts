import { AddEditFormModel, CommonTableKeyValueModel, CommonTableSearchFormModel } from '@shared/models/common.model'
import Constant from '@core/config/constant.config'
import { Validators } from '@angular/forms'

/**
 * 列表结构定义
 */
export const tableConfig: CommonTableKeyValueModel[] = [
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
export const queryForm: CommonTableSearchFormModel[] = [
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
 * 新增编辑表单
 */
export const addEditFormConfig: AddEditFormModel[] = [
  {
    label: '角色名称',
    name: 'roleName',
    type: 'input',
    columnCount: 1,
    validatorOrOpts: [Validators.required, Validators.maxLength(32)]
  }
]
