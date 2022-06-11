import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table'
import { NzDateMode } from 'ng-zorro-antd/date-picker'
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms'

/**
 * 自定义栅格级别
 */
export enum CommonBreakPoints {
  Xs,
  Sm,
  Md,
  Lg,
  Xl,
  Xxl
}

/**
 * 通用列表传参格式
 */
export interface CommonTableKeyValueModel {
  name: string
  value: string
  type?: 'string' | 'date'
  format?: string
  width?: string
  align?: 'left' | 'right' | 'center' | null
  showSort?: boolean
  sortOrder?: NzTableSortOrder //默认排序顺序
  sortFn?: NzTableSortFn<any> | boolean // 排序方法，true代表服务器排序
  ellipsis?: boolean // 是否需要让单元格内容根据宽度自动省略(...)
  hide?: boolean // 是否属于隐藏列
  fixed?: 'left' | 'right' // 固定列
}

/**
 * 通用列表搜索表单传参格式
 */
export interface CommonTableSearchFormModel {
  name: string // 显示名称
  value: string // 字段名称
  type: 'input' | 'select' | 'date' | 'date-range'
  dictType?: string
  format?: string
  dateMode?: NzDateMode
}

/**
 * 新增编辑表单配置格式
 */
export interface AddEditFormModel {
  label: string // 显示名称
  name: string // 字段名
  value?: any // 表单回显值
  type: 'input' | 'select' | 'date' | 'date-range' | 'number'
  extra?: { [key: string]: any } // 一些额外的组件的设置包含
  columnCount: 1 | 2 | 3 | 4 // 每行条目数
  hide?: boolean
  disabled?: boolean
  clearable?: boolean // 是否可清空
  validatorOrOpts?: ValidatorFn[] // 校验规则
  errorMessage?: { [key: string]: string } // 校验错误失败对应提示语
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
}
