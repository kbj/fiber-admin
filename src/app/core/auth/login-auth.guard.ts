import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import {Observable} from 'rxjs'
import localCache from '@utils/cache.util'
import Constant from '@core/config/constant.config'

/**
 * 用户登录状态检查的路由守卫
 */
@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate, CanActivateChild, CanDeactivate<boolean> {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivateChild(route, state)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 检查是否有登录信息
    if (localCache.getCache(Constant.LocalStorageAuthorizationKey)) {
      return true
    }
    return this.router.parseUrl('/login')
  }

  canDeactivate(
    component: boolean,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }
}
