import { Injectable } from '@angular/core'
import { UserStoreService } from '@store/user-store.service'
import localCache from '@utils/local-cache.util'
import Constant from '@core/config/constant.config'
import { UserInfo } from '@shared/models/user.model'
import sessionCache from '@utils/session-cache.util'
import { MenuTreeModel } from '@shared/models/menu.model'
import { ActivatedRoute } from '@angular/router'
import { WindowService } from '@services/common/window.service'

/**
 * 系统初始化所需的信息
 */
@Injectable({
  providedIn: 'root'
})
export class SystemInitService {
  constructor(
    private userStore: UserStoreService,
    private activeRoute: ActivatedRoute,
    private windowService: WindowService
  ) {}

  load() {
    // 初始化用户信息
    this.loadUserInfo()
    // 初始化菜单信息
    this.loadMenuInfo()
    // 监听栅格变化
    this.windowService.listenWindowBreakPoint()
  }

  /**
   * 初始化用户信息
   * @private
   */
  private loadUserInfo() {
    const userInfo = localCache.getCache<UserInfo>(Constant.LocalStorageUserInfoKey)
    if (userInfo) {
      this.userStore.userInfo.next(userInfo)
    }
    const token = localCache.getCache<string>(Constant.LocalStorageAuthorizationKey)
    if (token) {
      this.userStore.token.next(token)
    }
  }

  /**
   * 初始化菜单信息
   * @private
   */
  private loadMenuInfo() {
    const menuList = sessionCache.getCache<MenuTreeModel[]>(Constant.SessionStorageMenuListKey)
    if (menuList) {
      this.userStore.flatMenuList.next(menuList)
    }

    const menuTreeList = sessionCache.getCache<MenuTreeModel[]>(Constant.SessionStorageMenuTreeListKey)
    if (menuTreeList) {
      this.userStore.menuTreeList.next(menuTreeList)
    }
  }
}
