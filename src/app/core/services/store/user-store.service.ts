import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {UserInfo} from '@models/user.model'
import {MenuTreeModel} from '@models/menu.model'

/**
 * 用户相关的存储
 */
@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  constructor() {}

  // 用户菜单树列表
  private _menuTreeList = new BehaviorSubject<MenuTreeModel[]>([])

  get menuTreeList(): BehaviorSubject<MenuTreeModel[]> {
    return this._menuTreeList
  }

  set menuTreeList(value: BehaviorSubject<MenuTreeModel[]>) {
    this._menuTreeList = value
  }

  // 用户菜单列表
  private _flatMenuList = new BehaviorSubject<MenuTreeModel[]>([])

  get flatMenuList(): BehaviorSubject<MenuTreeModel[]> {
    return this._flatMenuList
  }

  set flatMenuList(value: BehaviorSubject<MenuTreeModel[]>) {
    this._flatMenuList = value
  }

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
