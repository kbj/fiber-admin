import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { DestroyService } from '@services/common/destroy.service'
import { filter, takeUntil } from 'rxjs'
import { NavTabService } from '@services/common/nav-tab.service'
import { NavTabModel } from '@models/nav-tab.model'

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.less'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavTabComponent implements OnInit {
  tabList = this.navTabService.tabList // 标签页的数组

  constructor(
    private router: Router,
    private destroy: DestroyService,
    private navTabService: NavTabService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    // 路由跳转成功后记录路由信息添加的路由标签页的数组中
    this.router.events
      .pipe(
        takeUntil(this.destroy),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((data) => {
        const routeInfo = data as NavigationEnd

        // 添加到tab中
        this.navTabService.addTab({
          name: '首页',
          path: routeInfo.url
        })

        // 更新当前激活的tab索引值
        this.navTabService.updateTabIndex(routeInfo.url)

        // 通知页面更新
        this.cdr.markForCheck()
      })
  }

  // 获取当前激活的标签页的索引值
  get currentTabIndex(): number {
    return this.navTabService.activeTabIndex
  }

  /**
   * 用于标签页显示中的for循环，提升性能，给angular判断
   *
   * 有时你会需要改变这个集合，比如从后端接口返回了新的数据。那么问题来了，Angular不知道怎么跟踪这个集合里面的项，不知道哪些该添加哪些该修改哪些该删除。
   * 结果就是，Angular会把该集合里的项全部移除然后重新添加。
   * 解决方案是为*ngFor添加一个trackBy函数，告诉Angular该怎么跟踪集合的各项。trackBy函数需要两个参数，第一个是当前项的index，第二个是当前项，并返回一个唯一的标识
   */
  public trackByTab(index: number, item: NavTabModel) {
    return item.path
  }

  // 点击关闭标签页的按钮事件
  closeTabEvent(event: { index: number }) {
    this.closeTab(event.index)
  }

  ngOnInit(): void {}

  // 关闭标签页
  closeTab(index: number) {
    this.navTabService.closeTab(index)
  }

  // 跳转到对应页面
  goToPage(tab: NavTabModel) {
    this.router.navigate([tab.path])
  }
}
