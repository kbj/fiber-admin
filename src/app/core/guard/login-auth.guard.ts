import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import {Observable} from 'rxjs'
import {UserStoreService} from '@store/user-store.service'

/**
 * 用户登录状态检查的路由守卫
 */
@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router, private userStore: UserStoreService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 检查是否有登录信息
    const token = this.userStore.token.getValue()
    if (token && token.length > 0) {
      return true
    }
    return this.router.parseUrl('/login')
  }
}
