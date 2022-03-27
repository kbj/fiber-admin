import { MenuTreeModel } from '@models/menu.model'

class MapUtil {
  /**
   * 将树形结构的菜单树拍平
   * @param lists 菜单树
   */
  flatMenuTree(lists: MenuTreeModel[]): MenuTreeModel[] {
    const flatLists: MenuTreeModel[] = []

    const _recursiveMenu = (menus: MenuTreeModel[]) => {
      for (const menu of menus) {
        if (menu.type !== 1) {
          continue
        }

        if (menu.children) {
          _recursiveMenu(menu.children)
        }

        menu.children = undefined
        flatLists.push(menu)
      }
    }
    lists && _recursiveMenu(lists)

    return flatLists
  }
}

export default new MapUtil()
