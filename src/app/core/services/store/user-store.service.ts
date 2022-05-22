import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserInfo } from '@shared/models/user.model'
import { MenuTreeModel } from '@shared/models/menu.model'

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
  private _token = new BehaviorSubject<string | undefined>(undefined)

  get token(): BehaviorSubject<string | undefined> {
    return this._token
  }

  set token(value: BehaviorSubject<string | undefined>) {
    this._token = value
  }

  // 用户页面上的面包屑信息
  private _breadcrumbLists = new BehaviorSubject<string[]>([])

  get breadcrumbLists(): BehaviorSubject<string[]> {
    return this._breadcrumbLists
  }

  set breadcrumbLists(value: BehaviorSubject<string[]>) {
    this._breadcrumbLists = value
  }
}
