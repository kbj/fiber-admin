import { ActivatedRouteSnapshot } from '@angular/router'

class RouteUtil {
  /**
   * 通过传来的当前路由对象信息获取当前的路由全路径地址
   * @param activeRoute
   */
  getCurrentUrlByActivatedRoute(activeRoute: ActivatedRouteSnapshot) {
    // @ts-ignore
    return activeRoute?._routerState.url
  }
}

export default new RouteUtil()
