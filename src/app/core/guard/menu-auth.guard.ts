import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import {map, Observable} from 'rxjs'
import {UserStoreService} from '@store/user-store.service'
import {NzMessageService} from 'ng-zorro-antd/message'
import Constant from '@core/config/constant.config'

/**
 * 菜单访问权限守卫
 */
@Injectable({
  providedIn: 'root'
})
export class MenuAuthGuard implements CanActivateChild {
  // 不需要权限的地址
  NOT_AUTH_MENU = ['/main', '/main/home']

  constructor(private userStore: UserStoreService, private messageService: NzMessageService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 不需要权限
    if (this.NOT_AUTH_MENU.find((value) => value === state.url)) {
      return true
    }

    // 需要走权限判断
    const menus = this.userStore.flatMenuList.getValue()
    if (menus && menus.length > 0) {
      const result = !!menus.find((menu) => menu.path === state.url)
      if (!result) {
        this.messageService.error(Constant.MessageNotAuthentication)
        return this.router.parseUrl('/main')
      }
      return result
    } else {
      return this.userStore.flatMenuList.pipe(
        map((mapMenu) => {
          const result = !!mapMenu.find((m) => m.path === state.url)
          if (!result) {
            this.messageService.error(Constant.MessageNotAuthentication)
            return this.router.parseUrl('/main')
          }
          return result
        })
      )
    }
  }
}
