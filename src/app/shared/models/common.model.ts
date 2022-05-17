import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table'
import { NzDateMode } from 'ng-zorro-antd/date-picker'

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
  name: string
  value: string
  type: 'input' | 'select' | 'date' | 'date-range'
  dictType?: string
  format?: string
  dateMode?: NzDateMode
}
