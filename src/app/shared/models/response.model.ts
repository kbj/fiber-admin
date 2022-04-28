// 通用数据返回格式
export interface ResponseModel<T> {
  code: number
  msg: string
  data: T
}

// 通用分页数据返回格式
export interface PageModel<T> {
  current: number // 当前页
  pageSize: number // 每页数量
  pages: number // 总页数
  total: number // 总条目数
  records: T[] // 数据
}
