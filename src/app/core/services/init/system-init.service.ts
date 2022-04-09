import {Injectable} from '@angular/core'
import {UserStoreService} from '@store/user-store.service'
import localCache from '@utils/local-cache.util'
import Constant from '@core/config/constant.config'
import {UserInfo} from '@models/user.model'
import sessionCache from '@utils/session-cache.util'
import {MenuTreeModel} from '@models/menu.model'
import {ActivatedRoute} from '@angular/router'
import routeUtil from '@utils/route.util'

/**
 * 系统初始化所需的信息
 */
@Injectable({
  providedIn: 'root'
})
export class SystemInitService {
  constructor(private userStore: UserStoreService, private activeRoute: ActivatedRoute) {}

  load() {
    this.loadUserInfo()
    this.loadMenuInfo()
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
    const token = localCache.getCache<String>(Constant.LocalStorageAuthorizationKey)
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
      // 获取面包屑和路由展开信息
      const breadcrumbs = routeUtil.generateBreadcrumb(
        routeUtil.getCurrentUrlByActivatedRoute(this.activeRoute.snapshot),
        menuTreeList
      )
      this.userStore.breadcrumbLists.next(breadcrumbs)
      this.userStore.menuTreeList.next(menuTreeList)
    }
  }
}
