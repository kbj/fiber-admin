import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router'
import Constant from '@core/config/constant.config'

/**
 * 重写创建逻辑实现路由服用
 * https://zhuanlan.zhihu.com/p/29823560
 */
export class ReuseStrategy implements RouteReuseStrategy {
  // 定义一个 _cacheRouters 用于缓存数据（路由快照及当前组件实例对象）
  public static _cacheRouters: { [key: string]: any } = {}

  // 是否允许复用路由
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const cache = route.data[Constant.CacheKey]
    const cpmKey = route.data[Constant.ComponentKey]
    return !(cache === false || !cpmKey)
  }

  // 当路由离开时会触发，存储路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // cache为false代表不需要缓存路由
    const cache = route.data[Constant.CacheKey]
    const cpmKey = route.data[Constant.ComponentKey]
    if (cache === false || !cpmKey) {
      return
    }

    ReuseStrategy._cacheRouters[cpmKey] = handle
  }

  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const cache = route.data[Constant.CacheKey]
    const cpmKey = route.data[Constant.ComponentKey]

    if (cache === false || !cpmKey) {
      return null
    }

    return ReuseStrategy._cacheRouters[cpmKey]
  }

  // 是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const cache = route.data[Constant.CacheKey]
    const cpmKey = route.data[Constant.ComponentKey]
    if ((cache && cache === false) || !cpmKey) {
      return false
    }
    return !!ReuseStrategy._cacheRouters[cpmKey]
  }

  // 进入路由触发，是否同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data[Constant.ComponentKey] === curr.data[Constant.ComponentKey]
  }
}
