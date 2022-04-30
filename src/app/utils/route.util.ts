import { ActivatedRouteSnapshot } from '@angular/router'
import { MenuTreeModel } from '@shared/models/menu.model'

class RouteUtil {
  /**
   * 通过传来的当前路由对象信息获取当前的路由全路径地址
   * @param activeRoute
   */
  getCurrentUrlByActivatedRoute(activeRoute: ActivatedRouteSnapshot): string {
    // @ts-ignore
    return activeRoute?._routerState.url
  }

  /**
   * 简化url，把/替换为_
   * @param url
   */
  simplifyUrl(url: string): string {
    return url.replace(/\//g, '_')
  }

  /**
   * 根据路由和菜单生成菜单树
   */
  generateBreadcrumb(currentRoute: string, menus: MenuTreeModel[]): string[] {
    const path: string[] = []

    function _recursiveMenuTreePath(menuTrees: MenuTreeModel[]): boolean {
      for (let menu of menuTrees) {
        if (menu.path === currentRoute) {
          menu.open = true
          path.unshift(menu.name)
          return true
        }

        if (menu.children && menu.children.length > 0) {
          if (_recursiveMenuTreePath(menu.children)) {
            menu.open = true
            path.unshift(menu.name)
            return true
          }
        }
      }
      return false
    }

    _recursiveMenuTreePath(menus)
    return path
  }
}

export default new RouteUtil()
