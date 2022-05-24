/**
 * 自定义HTTP业务方面的错误
 */
class CustomHttpError extends Error {
  private _code: number

  get code(): number {
    return this._code
  }

  set code(value: number) {
    this._code = value
  }

  constructor(code: number, msg: string) {
    super(msg)
    this._code = code
  }
}

export default CustomHttpError
