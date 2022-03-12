import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {UserInfo} from '@models/user.model'

/**
 * 用户相关的存储
 */
@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  constructor() {}

  // 用户的相关信息
  private _userInfo = new BehaviorSubject<UserInfo | undefined>(undefined)

  get userInfo(): BehaviorSubject<UserInfo | undefined> {
    return this._userInfo
  }

  set userInfo(value: BehaviorSubject<UserInfo | undefined>) {
    this._userInfo = value
  }

  // 登录用户的token
  private _token = new BehaviorSubject<String | undefined>(undefined)

  get token(): BehaviorSubject<String | undefined> {
    return this._token
  }

  set token(value: BehaviorSubject<String | undefined>) {
    this._token = value
  }
}
