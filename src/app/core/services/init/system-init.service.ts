import { Injectable } from '@angular/core'
import { UserStoreService } from '@store/user-store.service'
import cacheUtil from '@utils/cache.util'
import Constant from '@core/config/constant.config'
import { UserInfo } from '@shared/models/user.model'
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
    // 取出缓存
    const userInfo = cacheUtil.getCache<UserInfo>(Constant.CACHE_KEY_USER_INFO)
    const token = cacheUtil.getCache<string>(Constant.CACHE_KEY_AUTHORIZATION)
    const rememberMe = cacheUtil.getCache<boolean>(Constant.CACHE_KEY_REMEMBER_ME)

    if (userInfo) {
      this.userStore.userInfo.next(userInfo)
    }
    if (token) {
      this.userStore.token.next(token)
    }
    if (rememberMe) {
      this.userStore.rememberMe.next(rememberMe)
    }
  }

  /**
   * 初始化菜单信息
   * @private
   */
  private loadMenuInfo() {
    const menuList = cacheUtil.getCache<MenuTreeModel[]>(Constant.CACHE_KEY_MENU_LIST)
    if (menuList) {
      this.userStore.flatMenuList.next(menuList)
    }

    const menuTreeList = cacheUtil.getCache<MenuTreeModel[]>(Constant.CACHE_KEY_MENU_TREE_LIST)
    if (menuTreeList) {
      this.userStore.menuTreeList.next(menuTreeList)
    }
  }
}
