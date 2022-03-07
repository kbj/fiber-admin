export interface ResponseModel<T> {
  code: number
  msg: string
  data: T
}
