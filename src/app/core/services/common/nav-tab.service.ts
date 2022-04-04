import {Injectable} from '@angular/core'
import {NavTabModel} from '@models/nav-tab.model'
import {Router} from '@angular/router'
import {ReuseStrategy} from '@services/common/reuse-strategy'

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
  closeTab(index: number, tab: NavTabModel) {
    if (this.tabList.length < 2) {
      return
    }

    this._tabList.splice(index, 1)
    if (index == this.activeTabIndex) {
      // 关闭的是当前所在的页签
      this.activeTabIndex = index - 1 < 0 ? 0 : index - 1
      this.router.navigateByUrl(this.tabList[this.activeTabIndex].path)

      // 路由缓存策略需要标记不需要缓存
      ReuseStrategy._closeRoute = tab.path
    } else if (index < this.activeTabIndex) {
      // 关闭的标签页在当前页之前
      this.activeTabIndex = this.activeTabIndex - 1
    }

    // 删除缓存的路由
    ReuseStrategy.removeCacheRouter(tab.path)
  }

  /**
   * 关闭除了当前页以外的其他标签
   */
  closeOtherTab(index: number, tab: NavTabModel) {
    if (this._tabList.length < 2) {
      return
    }

    // 如果当前激活的页和右键的页不是一个页面
    if (index !== this.activeTabIndex) {
      ReuseStrategy._closeRoute = this._tabList[this.activeTabIndex].path
    }

    let i = 0
    while (this._tabList.length > 1) {
      if (tab.path !== this._tabList[i].path) {
        ReuseStrategy.removeCacheRouter(this._tabList[i].path)
        this._tabList.splice(i, 1)
      } else {
        i++
      }
    }

    // 跳转
    if (index !== this.activeTabIndex) {
      this.router.navigateByUrl(tab.path)
    }
    this.activeTabIndex = 0
  }

  /**
   * 关闭右侧标签
   */
  closeRightSizeTab(index: number, tab: NavTabModel) {
    if (this.tabList.length < 2 || index + 1 === this.tabList.length) {
      return
    }
    const activeTab = this.tabList[this.activeTabIndex]

    while (this._tabList.length > index + 1) {
      if (this._tabList[index + 1].path === activeTab.path) {
        ReuseStrategy._closeRoute = activeTab.path
      } else {
        ReuseStrategy.removeCacheRouter(this._tabList[index + 1].path)
      }
      this._tabList.splice(index + 1, 1)
    }

    if (this.activeTabIndex > index) {
      this.router.navigateByUrl(tab.path)
      this.activeTabIndex = index
    }
  }

  /**
   * 关闭两侧标签
   */
  closeLeftTab(index: number, tab: NavTabModel) {
    if (this.tabList.length < 2 || index === 0) {
      return
    }
    const activeTab = this.tabList[this.activeTabIndex]

    // 关闭标签页
    while (this._tabList[0].path !== tab.path) {
      if (this._tabList[0].path === activeTab.path) {
        ReuseStrategy._closeRoute = activeTab.path
      } else {
        ReuseStrategy.removeCacheRouter(this._tabList[0].path)
      }
      this._tabList.splice(0, 1)
    }

    // 跳转
    if (this.activeTabIndex < index) {
      this.router.navigateByUrl(tab.path)
      this.activeTabIndex = 0
    } else {
      for (let i = 0; i < this._tabList.length; i++) {
        if (this._tabList[i].path === activeTab.path) {
          this.activeTabIndex = i
        }
      }
    }
  }
}
