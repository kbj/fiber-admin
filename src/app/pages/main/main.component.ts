import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { OthersStoreService } from '@store/others-store.service'
import { fadeRouteAnimation } from '../../animations/fade.animation'
import { ActivatedRoute, RouterOutlet } from '@angular/router'
import { UserStoreService } from '@store/user-store.service'
import Constant from '@core/config/constant.config'
import routeUtil from '@utils/route.util'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  animations: [fadeRouteAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public globalCollapse = this.othersStore.globalCollapse

  constructor(
    private activeRoute: ActivatedRoute,
    private userStore: UserStoreService,
    private othersStore: OthersStoreService
  ) {}

  ngOnInit(): void {
    // 初始化面包屑
    const breadcrumbs = routeUtil.generateBreadcrumb(
      routeUtil.getCurrentUrlByActivatedRoute(this.activeRoute.snapshot),
      this.userStore.menuTreeList.getValue()
    )
    this.userStore.breadcrumbLists.next(breadcrumbs)
  }

  // 收缩伸展事件绑定当前状态
  collapseSize(value: boolean) {
    this.globalCollapse.next(value)
  }

  // 加载路由
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.[Constant.ROUTE_DATA_CACHE_KEY] !== false
  }
}
