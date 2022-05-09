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
}
