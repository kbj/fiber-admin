import {Injectable} from '@angular/core'
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router'
import {Observable} from 'rxjs'
import localCache from '@utils/local-cache.util'
import Constant from '@core/config/constant.config'

/**
 * 用户登录状态检查的路由守卫
 */
@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 检查是否有登录信息
    if (localCache.getCache(Constant.LocalStorageAuthorizationKey)) {
      return true
    }
    return this.router.parseUrl('/login')
  }
}
