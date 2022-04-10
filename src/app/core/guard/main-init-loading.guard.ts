import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router'
import {Observable, Subject} from 'rxjs'
import {UserStoreService} from '@store/user-store.service'
import {OthersStoreService} from '@store/others-store.service'
import {LoginService} from '@services/login/login.service'

/**
 * main组件检查初始化完毕的守卫，主要用于菜单初始化
 */
@Injectable({
  providedIn: 'root'
})
export class MainInitLoadingGuard implements CanActivate {
  /**
   * 加载框是否加载完毕，默认false
   */
  loadingSuccess = new Subject<boolean>()

  constructor(
    private userStore: UserStoreService,
    private otherStore: OthersStoreService,
    private loginService: LoginService
  ) {
    // 请求菜单
    this.loginService.getMenuTreeList()

    // 监听菜单是否已经加载完毕
    this.userStore.flatMenuList.asObservable().subscribe((value) => {
      if (value.length > 0) {
        this.loadingSuccess.next(true)
      }
    })

    this.loadingSuccess.asObservable().subscribe((load) => {
      if (load) {
        this.otherStore.globalSpin.next(false)
      }
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 监控菜单树是否已经加载
    this.otherStore.globalSpin.next(true)
    return this.loadingSuccess
  }
}
