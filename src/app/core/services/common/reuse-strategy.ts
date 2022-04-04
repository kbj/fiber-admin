import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router'
import Constant from '@core/config/constant.config'
import routeUtil from '@utils/route.util'
import {NzSafeAny} from 'ng-zorro-antd/core/types'

/**
 * 重写创建逻辑实现路由服用
 * https://zhuanlan.zhihu.com/p/29823560
 */
export class ReuseStrategy implements RouteReuseStrategy {
  // 定义一个 _cacheRouters 用于缓存数据（路由快照及当前组件实例对象）
  public static _cacheRouters: { [key: string]: any } = {}

  // 记录需要被关闭的路由，避免缓存
  public static _closeRoute: string | undefined = undefined

  // 删除缓存的路由
  public static removeCacheRouter(url: string) {
    url = routeUtil.simplifyUrl(url)
    if (ReuseStrategy._cacheRouters[url]) {
      ReuseStrategy._cacheRouters[url].componentRef.destroy()
      delete ReuseStrategy._cacheRouters[url]
    }
  }

  // 是否允许复用路由
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 当是否缓存为false
    return route.data[Constant.CacheKey] !== false
  }

  // 当路由离开时会触发，存储路由
  store(route: ActivatedRouteSnapshot, handle: NzSafeAny): void {
    // cache为false代表不需要缓存路由
    if (route.data[Constant.CacheKey] === false) {
      return
    }
    // 处理当前需要缓存的路由是否是被关闭的路由
    if (ReuseStrategy._closeRoute && ReuseStrategy._closeRoute === routeUtil.getCurrentUrlByActivatedRoute(route)) {
      handle.componentRef.destroy()
      ReuseStrategy._closeRoute = undefined
      return
    }

    ReuseStrategy._cacheRouters[routeUtil.simplifyUrl(routeUtil.getCurrentUrlByActivatedRoute(route))] = handle
  }

  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // 只缓存叶子路由
    if (
      route.data[Constant.CacheKey] === false ||
      route.routeConfig?.children ||
      route.routeConfig?.loadChildren ||
      !ReuseStrategy._cacheRouters[routeUtil.simplifyUrl(routeUtil.getCurrentUrlByActivatedRoute(route))]
    ) {
      return null
    }

    return ReuseStrategy._cacheRouters[routeUtil.simplifyUrl(routeUtil.getCurrentUrlByActivatedRoute(route))]
  }

  // 是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return (
      route.data[Constant.CacheKey] !== false &&
      !route.routeConfig?.children &&
      !route.routeConfig?.loadChildren &&
      !!ReuseStrategy._cacheRouters[routeUtil.simplifyUrl(routeUtil.getCurrentUrlByActivatedRoute(route))]
    )
  }

  // 进入路由触发，是否同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig && JSON.stringify(future.params) === JSON.stringify(curr.params)
  }
}
