import { AddEditFormModel, CommonTableKeyValueModel, CommonTableSearchFormModel } from '@shared/models/common.model'
import Constant from '@core/config/constant.config'
import { Validators } from '@angular/forms'
import { MAX_LENGTH, REQUIRED } from '@shared/components/add-edit-form/form-validators-error-code'

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
    clearable: true,
    validatorOrOpts: [Validators.required, Validators.maxLength(100)],
    errorMessage: {
      [REQUIRED]: '角色名称不能为空',
      [MAX_LENGTH]: '角色名称长度不能超过100'
    }
  },
  {
    label: '角色编码',
    name: 'roleCode',
    type: 'input',
    columnCount: 1,
    clearable: true,
    validatorOrOpts: [Validators.required, Validators.maxLength(100)],
    errorMessage: {
      [REQUIRED]: '角色编码不能为空',
      [MAX_LENGTH]: '角色编码长度不能超过100'
    }
  },
  {
    label: '角色顺序',
    name: 'sequence',
    type: 'number',
    columnCount: 1,
    value: 0,
    extra: { nzMin: 0, nzStep: 1 }
  }
]
