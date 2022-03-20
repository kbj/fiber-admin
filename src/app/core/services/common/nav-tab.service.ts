import {Injectable} from '@angular/core'
import {NavTabModel} from '@models/nav-tab.model'
import {Router} from '@angular/router'

/**
 * 页签相关的服务
 */
@Injectable({
  providedIn: 'root'
})
export class NavTabService {
  constructor(private router: Router) {}

  // tab页签的数组
  private _tabList: NavTabModel[] = []

  get tabList(): NavTabModel[] {
    return this._tabList
  }

  // 当前激活的tab的索引值
  private _activeTabIndex: number = 0

  get activeTabIndex(): number {
    return this._activeTabIndex
  }

  set activeTabIndex(value: number) {
    this._activeTabIndex = value
  }

  /**
   * 根据当前的路由地址匹配修改当前激活的tab索引值
   */
  updateTabIndex(path: string) {
    this.activeTabIndex = this.tabList.findIndex((item) => item.path == path)
  }

  /**
   * 清空页签
   */
  clearTabs() {
    this._tabList = []
  }

  /**
   * 新增页签
   */
  addTab(param: NavTabModel) {
    if (!this._tabList.find((value) => value.path === param.path)) {
      this._tabList.push(param)
    }
  }

  /**
   * 关闭页签
   */
  closeTab(index: number) {
    if (this.tabList.length < 2) {
      return
    }
    this._tabList.splice(index, 1)
    if (index == this.activeTabIndex) {
      // 关闭的是当前所在的页签
      this.activeTabIndex = index - 1 < 0 ? 0 : index - 1
      this.router.navigateByUrl(this.tabList[this.activeTabIndex].path)
    } else if (index < this.activeTabIndex) {
      // 关闭的标签页在当前页之前
      this.activeTabIndex = this.activeTabIndex - 1
    }
  }
}
