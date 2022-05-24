import { Injectable } from '@angular/core'
import LoginAccount from '@pages/login/model/login-account'
import { HttpClient } from '@angular/common/http'
import { NzMessageService } from 'ng-zorro-antd/message'
import { ActivatedRoute, Router } from '@angular/router'
import { ResponseModel } from '@shared/models/response.model'
import { UserInfo } from '@shared/models/user.model'
import { OthersStoreService } from '@store/others-store.service'
import { finalize } from 'rxjs'
import cacheUtil from '@utils/cache.util'
import Constant from '@core/config/constant.config'
import { UserStoreService } from '@store/user-store.service'
import { MenuTreeModel } from '@shared/models/menu.model'
import mapUtil from '@utils/map.util'
import { NavTabService } from '@services/common/nav-tab.service'
import { ReuseStrategy } from '@services/common/reuse-strategy'

/**
 * 登录模块service
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private othersStore: OthersStoreService,
    private userStore: UserStoreService,
    private navTabService: NavTabService
  ) {}

  /**
   * 账号密码方式登录
   * @param loginAccount 提交参数
   */
  accountLogin(loginAccount: LoginAccount) {
    // 更新记住登录状态
    this.userStore.rememberMe.next(loginAccount.rememberMe)
    cacheUtil.setCache(Constant.CACHE_KEY_REMEMBER_ME, loginAccount.rememberMe)

    this.othersStore.globalSpin.next(true) // 显示全局加载框
    this.http
      .post<ResponseModel<UserInfo>>('login', loginAccount)
      .pipe(finalize(() => this.othersStore.globalSpin.next(false)))
      .subscribe((resp) => {
        // 登录成功
        this.message.success(`欢迎您！${resp.data.name}`)

        // 保存用户信息和Token
        this.userStore.userInfo.next(resp.data)
        cacheUtil.setCache(Constant.CACHE_KEY_USER_INFO, resp.data)
        if (loginAccount.rememberMe) {
          cacheUtil.setCache(Constant.CACHE_KEY_USER_INFO, resp.data)
        } else {
          cacheUtil.setCache(Constant.CACHE_KEY_USER_INFO, resp.data, true)
          cacheUtil.deleteCache(Constant.CACHE_KEY_AUTHORIZATION)
          cacheUtil.deleteCache(Constant.CACHE_KEY_USER_INFO)
        }

        // 跳转
        this.router.navigate(['main'])
      })
  }

  /**
   * 请求菜单树结构
   */
  getMenuTreeList() {
    this.http.get<ResponseModel<MenuTreeModel[]>>('system/menu/tree-list').subscribe((resp) => {
      // 更新菜单树
      const treeList = resp.data ? resp.data : []
      const newTreeList = JSON.parse(JSON.stringify(treeList))
      this.userStore.menuTreeList.next(newTreeList)
      cacheUtil.setCache(Constant.CACHE_KEY_MENU_TREE_LIST, treeList, true)

      // 更新拍平的菜单列表
      const flatList = mapUtil.flatMenuTree(treeList)
      this.userStore.flatMenuList.next(flatList)
      cacheUtil.setCache(Constant.CACHE_KEY_MENU_LIST, flatList, true)
    })
  }

  /**
   * 注销登录
   */
  logout() {
    // 清除localStorage
    cacheUtil.clearCache()

    // 清空菜单树
    this.userStore.flatMenuList.next([])
    this.userStore.menuTreeList.next([])
    this.userStore.breadcrumbLists.next([])

    // 清除用户信息
    this.userStore.userInfo.next(undefined)
    this.userStore.token.next(undefined)
    this.userStore.rememberMe.next(false)
    this.othersStore.globalCollapse.next(false)

    // 清除tab页内容和缓存
    this.navTabService.clearTabs()
    if (ReuseStrategy._cacheRouters) {
      for (let key of Object.keys(ReuseStrategy._cacheRouters)) {
        ReuseStrategy._cacheRouters[key].componentRef.destroy()
      }
      ReuseStrategy._cacheRouters = {}
      // @ts-ignore
      ReuseStrategy._closeRoute = this.activeRoute.snapshot['_routerState'].url
    }

    // 导航到登录页
    this.router.navigateByUrl('/login')
  }
}
